-- ==============================================================================
-- ANKAHE (अनकहे) — Comprehensive Database Schema & Row Level Security
-- Migration: 20261029000000_ankahe_schema_and_rls.sql
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  display_name TEXT,
  bio TEXT,
  avatar_url TEXT,
  preferred_language TEXT DEFAULT 'Hindi',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT username_length CHECK (char_length(username) >= 3 AND char_length(username) <= 30),
  CONSTRAINT username_format CHECK (username ~* '^[a-zA-Z0-9_]+$')
);

-- Index for username lookups
CREATE INDEX IF NOT EXISTS idx_profiles_username ON public.profiles(username);

-- 3. WRITINGS TABLE
CREATE TABLE IF NOT EXISTS public.writings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT,
  content TEXT NOT NULL,
  content_type TEXT NOT NULL DEFAULT 'Thought',
  language TEXT NOT NULL DEFAULT 'Hindi',
  mood TEXT,
  visibility TEXT NOT NULL DEFAULT 'public' CHECK (visibility IN ('public', 'anonymous', 'private')),
  status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT content_length CHECK (char_length(content) >= 1 AND char_length(content) <= 15000),
  CONSTRAINT title_length CHECK (title IS NULL OR char_length(title) <= 200)
);

-- Foreign key relationship to profiles for PostgREST joins
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'writings_user_id_profiles_fkey'
  ) THEN
    ALTER TABLE public.writings
      ADD CONSTRAINT writings_user_id_profiles_fkey
      FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;
  END IF;
EXCEPTION
  WHEN OTHERS THEN NULL;
END $$;

-- Indexes for performance and filtering
CREATE INDEX IF NOT EXISTS idx_writings_user_id ON public.writings(user_id);
CREATE INDEX IF NOT EXISTS idx_writings_visibility_status ON public.writings(visibility, status);
CREATE INDEX IF NOT EXISTS idx_writings_content_type ON public.writings(content_type);
CREATE INDEX IF NOT EXISTS idx_writings_language ON public.writings(language);
CREATE INDEX IF NOT EXISTS idx_writings_mood ON public.writings(mood);
CREATE INDEX IF NOT EXISTS idx_writings_created_at ON public.writings(created_at DESC);

-- 4. SAVED WRITINGS TABLE
CREATE TABLE IF NOT EXISTS public.saved_writings (
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  writing_id UUID NOT NULL REFERENCES public.writings(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, writing_id)
);

CREATE INDEX IF NOT EXISTS idx_saved_writings_user_id ON public.saved_writings(user_id);
CREATE INDEX IF NOT EXISTS idx_saved_writings_writing_id ON public.saved_writings(writing_id);

-- 5. REACTIONS TABLE
CREATE TABLE IF NOT EXISTS public.reactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  writing_id UUID NOT NULL REFERENCES public.writings(id) ON DELETE CASCADE,
  reaction_type TEXT NOT NULL CHECK (reaction_type IN ('felt', 'stayed', 'warmth')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (user_id, writing_id, reaction_type)
);

CREATE INDEX IF NOT EXISTS idx_reactions_writing_id ON public.reactions(writing_id);
CREATE INDEX IF NOT EXISTS idx_reactions_user_id ON public.reactions(user_id);

-- 6. COMMENTS TABLE
CREATE TABLE IF NOT EXISTS public.comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  writing_id UUID NOT NULL REFERENCES public.writings(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT comment_length CHECK (char_length(content) >= 1 AND char_length(content) <= 2000)
);

-- Foreign key to profiles for comment author info
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'comments_user_id_profiles_fkey'
  ) THEN
    ALTER TABLE public.comments
      ADD CONSTRAINT comments_user_id_profiles_fkey
      FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;
  END IF;
EXCEPTION
  WHEN OTHERS THEN NULL;
END $$;

CREATE INDEX IF NOT EXISTS idx_comments_writing_id ON public.comments(writing_id);
CREATE INDEX IF NOT EXISTS idx_comments_user_id ON public.comments(user_id);

-- 7. REPORTS TABLE
CREATE TABLE IF NOT EXISTS public.reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reporter_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  writing_id UUID NOT NULL REFERENCES public.writings(id) ON DELETE CASCADE,
  reason TEXT NOT NULL,
  details TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'dismissed')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_reports_writing_id ON public.reports(writing_id);
CREATE INDEX IF NOT EXISTS idx_reports_reporter_id ON public.reports(reporter_id);

-- ==============================================================================
-- 8. ANONYMOUS PRIVACY VIEW
-- Exposes published community writing while strictly scrubbing author user_id,
-- username, and display name for anonymous writings
-- ==============================================================================
CREATE OR REPLACE VIEW public.public_writings AS
SELECT 
  w.id,
  w.title,
  w.content,
  w.content_type,
  w.language,
  w.mood,
  w.visibility,
  w.status,
  w.created_at,
  w.updated_at,
  CASE 
    WHEN w.visibility = 'anonymous' THEN NULL
    ELSE w.user_id 
  END AS author_id,
  CASE 
    WHEN w.visibility = 'anonymous' THEN 'Anonymous'
    ELSE COALESCE(p.display_name, p.username, 'Writer')
  END AS author_name,
  CASE 
    WHEN w.visibility = 'anonymous' THEN NULL
    ELSE p.username
  END AS author_username,
  CASE 
    WHEN w.visibility = 'anonymous' THEN NULL
    ELSE p.avatar_url
  END AS author_avatar
FROM public.writings w
LEFT JOIN public.profiles p ON w.user_id = p.id
WHERE w.status = 'published' AND w.visibility IN ('public', 'anonymous');

-- ==============================================================================
-- 9. USER CREATION TRIGGER
-- Automatically creates a profile record when a new user signs up in auth.users
-- ==============================================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  desired_username TEXT;
  final_username TEXT;
  desired_display_name TEXT;
  desired_language TEXT;
  counter INT := 0;
BEGIN
  -- Extract metadata safely
  desired_username := LOWER(TRIM(COALESCE(NEW.raw_user_meta_data->>'username', '')));
  desired_display_name := TRIM(COALESCE(NEW.raw_user_meta_data->>'display_name', NEW.raw_user_meta_data->>'pen_name', ''));
  desired_language := COALESCE(NEW.raw_user_meta_data->>'preferred_language', 'Hindi');

  -- Fallback for username if empty
  IF desired_username = '' THEN
    desired_username := 'writer_' || SUBSTRING(REPLACE(NEW.id::text, '-', ''), 1, 8);
  END IF;

  -- Sanitize username (alphanumeric and underscore only)
  desired_username := REGEXP_REPLACE(desired_username, '[^a-zA-Z0-9_]', '', 'g');
  IF LENGTH(desired_username) < 3 THEN
    desired_username := desired_username || '_user';
  END IF;

  -- Ensure unique username
  final_username := desired_username;
  WHILE EXISTS (SELECT 1 FROM public.profiles WHERE username = final_username) LOOP
    counter := counter + 1;
    final_username := desired_username || counter::text;
  END LOOP;

  -- Fallback for display name
  IF desired_display_name = '' THEN
    desired_display_name := 'A Quiet Soul';
  END IF;

  INSERT INTO public.profiles (id, username, display_name, preferred_language, created_at, updated_at)
  VALUES (NEW.id, final_username, desired_display_name, desired_language, NOW(), NOW())
  ON CONFLICT (id) DO UPDATE
  SET 
    display_name = EXCLUDED.display_name,
    preferred_language = EXCLUDED.preferred_language,
    updated_at = NOW();

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ==============================================================================
-- 10. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.writings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_writings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;

-- ------------------------------------------------------------------------------
-- A. PROFILES POLICIES
-- ------------------------------------------------------------------------------
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;
CREATE POLICY "Public profiles are viewable by everyone"
  ON public.profiles FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- ------------------------------------------------------------------------------
-- B. WRITINGS POLICIES
-- ------------------------------------------------------------------------------
-- 1. SELECT:
-- - Author can always see their own writings (drafts, private, published, anonymous).
-- - Any visitor or authenticated user can view published public or anonymous writings.
-- - Private drafts can NEVER be viewed by other users.
DROP POLICY IF EXISTS "Writings visibility policy" ON public.writings;
CREATE POLICY "Writings visibility policy"
  ON public.writings FOR SELECT
  USING (
    auth.uid() = user_id
    OR
    (status = 'published' AND visibility IN ('public', 'anonymous'))
  );

-- 2. INSERT: Authenticated users can insert writings for themselves only
DROP POLICY IF EXISTS "Authenticated users can create writings" ON public.writings;
CREATE POLICY "Authenticated users can create writings"
  ON public.writings FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- 3. UPDATE: Authors can update only their own writings
DROP POLICY IF EXISTS "Authors can update own writings" ON public.writings;
CREATE POLICY "Authors can update own writings"
  ON public.writings FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- 4. DELETE: Authors can delete only their own writings
DROP POLICY IF EXISTS "Authors can delete own writings" ON public.writings;
CREATE POLICY "Authors can delete own writings"
  ON public.writings FOR DELETE
  USING (auth.uid() = user_id);

-- ------------------------------------------------------------------------------
-- C. SAVED WRITINGS POLICIES
-- ------------------------------------------------------------------------------
-- Only the user can view their saved collection
DROP POLICY IF EXISTS "Users can view own saved writings" ON public.saved_writings;
CREATE POLICY "Users can view own saved writings"
  ON public.saved_writings FOR SELECT
  USING (auth.uid() = user_id);

-- Users can save eligible writings (must be published or own)
DROP POLICY IF EXISTS "Users can save eligible writings" ON public.saved_writings;
CREATE POLICY "Users can save eligible writings"
  ON public.saved_writings FOR INSERT
  WITH CHECK (
    auth.uid() = user_id
    AND EXISTS (
      SELECT 1 FROM public.writings w
      WHERE w.id = writing_id
      AND (
        w.user_id = auth.uid()
        OR (w.status = 'published' AND w.visibility IN ('public', 'anonymous'))
      )
    )
  );

-- Users can remove items from their saved collection
DROP POLICY IF EXISTS "Users can delete own saved writings" ON public.saved_writings;
CREATE POLICY "Users can delete own saved writings"
  ON public.saved_writings FOR DELETE
  USING (auth.uid() = user_id);

-- ------------------------------------------------------------------------------
-- D. REACTIONS POLICIES
-- ------------------------------------------------------------------------------
-- Anyone can see reactions on published writing, or own reactions
DROP POLICY IF EXISTS "Reactions are viewable for accessible writings" ON public.reactions;
CREATE POLICY "Reactions are viewable for accessible writings"
  ON public.reactions FOR SELECT
  USING (
    auth.uid() = user_id
    OR EXISTS (
      SELECT 1 FROM public.writings w
      WHERE w.id = writing_id
      AND (w.status = 'published' AND w.visibility IN ('public', 'anonymous'))
    )
  );

-- Authenticated users can insert reactions on published writings
DROP POLICY IF EXISTS "Authenticated users can add reactions" ON public.reactions;
CREATE POLICY "Authenticated users can add reactions"
  ON public.reactions FOR INSERT
  WITH CHECK (
    auth.uid() = user_id
    AND EXISTS (
      SELECT 1 FROM public.writings w
      WHERE w.id = writing_id
      AND (w.status = 'published' AND w.visibility IN ('public', 'anonymous'))
    )
  );

-- Users can remove their own reactions
DROP POLICY IF EXISTS "Users can remove own reactions" ON public.reactions;
CREATE POLICY "Users can remove own reactions"
  ON public.reactions FOR DELETE
  USING (auth.uid() = user_id);

-- ------------------------------------------------------------------------------
-- E. COMMENTS POLICIES
-- ------------------------------------------------------------------------------
-- Anyone can view comments on published writings
DROP POLICY IF EXISTS "Comments viewable on published writings" ON public.comments;
CREATE POLICY "Comments viewable on published writings"
  ON public.comments FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.writings w
      WHERE w.id = writing_id
      AND (w.status = 'published' AND w.visibility IN ('public', 'anonymous'))
    )
  );

-- Authenticated users can comment on published writings
DROP POLICY IF EXISTS "Authenticated users can create comments" ON public.comments;
CREATE POLICY "Authenticated users can create comments"
  ON public.comments FOR INSERT
  WITH CHECK (
    auth.uid() = user_id
    AND EXISTS (
      SELECT 1 FROM public.writings w
      WHERE w.id = writing_id
      AND (w.status = 'published' AND w.visibility IN ('public', 'anonymous'))
    )
  );

-- Authors can update their own comments
DROP POLICY IF EXISTS "Authors can update own comments" ON public.comments;
CREATE POLICY "Authors can update own comments"
  ON public.comments FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Authors can delete their own comments OR writing owners can moderate
DROP POLICY IF EXISTS "Authors or writing owners can delete comments" ON public.comments;
CREATE POLICY "Authors or writing owners can delete comments"
  ON public.comments FOR DELETE
  USING (
    auth.uid() = user_id
    OR EXISTS (
      SELECT 1 FROM public.writings w
      WHERE w.id = writing_id AND w.user_id = auth.uid()
    )
  );

-- ------------------------------------------------------------------------------
-- F. REPORTS POLICIES
-- ------------------------------------------------------------------------------
-- Reporters can view only their own filed reports
DROP POLICY IF EXISTS "Reporters can view own reports" ON public.reports;
CREATE POLICY "Reporters can view own reports"
  ON public.reports FOR SELECT
  USING (auth.uid() = reporter_id);

-- Authenticated users can submit a report on published writings
DROP POLICY IF EXISTS "Authenticated users can submit reports" ON public.reports;
CREATE POLICY "Authenticated users can submit reports"
  ON public.reports FOR INSERT
  WITH CHECK (
    auth.uid() = reporter_id
    AND EXISTS (
      SELECT 1 FROM public.writings w
      WHERE w.id = writing_id
      AND (w.status = 'published' AND w.visibility IN ('public', 'anonymous'))
    )
  );

