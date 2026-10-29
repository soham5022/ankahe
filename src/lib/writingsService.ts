import { supabase } from './supabase';
import type { WritingItem, DraftItem, CommentItem, WritingType, Language, EmotionCategory, VisibilityPreference } from '../types';

/**
 * Formats approximate readable date from ISO timestamp
 */
export function formatWritingDate(isoString?: string): string {
  if (!isoString) return 'Moments ago';
  try {
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return 'Recently';
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
    });
  } catch {
    return 'Recently';
  }
}

/**
 * Maps database record to frontend WritingItem while strictly safeguarding anonymous privacy
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapDatabaseWriting(row: any, currentUserId?: string): WritingItem {
  const isAnonymous = row.visibility === 'anonymous';
  const isAuthor = currentUserId && row.user_id === currentUserId;

  let authorDisplay = 'Anonymous';
  let authorUsername: string | undefined = undefined;
  let authorAvatar: string | undefined = undefined;

  if (!isAnonymous) {
    if (row.profiles) {
      authorDisplay = row.profiles.display_name || row.profiles.username || 'Writer';
      authorUsername = row.profiles.username;
      authorAvatar = row.profiles.avatar_url;
    } else {
      authorDisplay = 'Writer';
    }
  } else if (isAuthor) {
    // If current viewer is the author of this anonymous post, show reminder
    authorDisplay = 'You (Posted Anonymously)';
  }

  const lang = (row.language || 'Hindi') as Language;
  const isDevanagari = lang === 'Hindi' || lang === 'Marathi';
  const isUrdu = lang === 'Urdu';

  return {
    id: row.id,
    userId: isAnonymous && !isAuthor ? undefined : row.user_id,
    title: row.title || undefined,
    content: row.content,
    author: authorDisplay,
    authorUsername,
    authorAvatar,
    isAnonymous,
    type: (row.content_type || 'Thought') as WritingType,
    language: lang,
    category: (row.mood || 'peace') as EmotionCategory,
    visibility: row.visibility as VisibilityPreference,
    status: row.status as 'draft' | 'published' | 'archived',
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    dateApprox: formatWritingDate(row.created_at),
    isPaperStyle: row.content_type === 'Sher & Shayari' || row.content_type === 'Unsent Letter',
    scriptStyle: isDevanagari ? 'devanagari' : isUrdu ? 'nastaliq' : 'serif',
  };
}

/**
 * Fetch public community writings with optional filters
 */
export async function fetchPublicWritings(options?: {
  type?: string;
  language?: string;
  mood?: string;
  limit?: number;
  currentUserId?: string;
}): Promise<{ writings: WritingItem[]; error?: string }> {
  try {
    let query = supabase
      .from('writings')
      .select('*, profiles(id, username, display_name, avatar_url)')
      .eq('status', 'published')
      .in('visibility', ['public', 'anonymous'])
      .order('created_at', { ascending: false });

    if (options?.type && options.type !== 'all' && options.type !== 'All' && options.type !== 'All Writing') {
      query = query.eq('content_type', options.type);
    }
    if (options?.language && options.language !== 'All') {
      query = query.eq('language', options.language);
    }
    if (options?.mood && options.mood !== 'All' && options.mood !== 'all') {
      query = query.eq('mood', options.mood);
    }
    if (options?.limit) {
      query = query.limit(options.limit);
    }

    const { data, error } = await query;
    if (error) {
      // Fallback: if foreign key profiles join fails due to schema cache, retry without join
      if (error.code === 'PGRST200') {
        const fallbackQuery = supabase
          .from('writings')
          .select('*')
          .eq('status', 'published')
          .in('visibility', ['public', 'anonymous'])
          .order('created_at', { ascending: false });
        
        const fallbackRes = await fallbackQuery;
        if (fallbackRes.error) {
          return { writings: [], error: fallbackRes.error.message };
        }
        return {
          writings: (fallbackRes.data || []).map((row) => mapDatabaseWriting(row, options?.currentUserId))
        };
      }
      return { writings: [], error: error.message };
    }

    const items = (data || []).map((row) => mapDatabaseWriting(row, options?.currentUserId));
    return { writings: items };
  } catch (err) {
    return { writings: [], error: err instanceof Error ? err.message : String(err) };
  }
}

/**
 * Search community writing
 */
export async function searchPublicWritings(
  searchQuery: string,
  options?: {
    type?: string;
    language?: string;
    mood?: string;
    limit?: number;
    currentUserId?: string;
  }
): Promise<{ writings: WritingItem[]; error?: string }> {
  try {
    let query = supabase
      .from('writings')
      .select('*, profiles(id, username, display_name, avatar_url)')
      .eq('status', 'published')
      .in('visibility', ['public', 'anonymous'])
      .order('created_at', { ascending: false });

    if (searchQuery.trim()) {
      // Filter by text content or title
      query = query.or(`content.ilike.%${searchQuery.trim()}%,title.ilike.%${searchQuery.trim()}%`);
    }
    if (options?.type && options.type !== 'All' && options.type !== 'All Writing') {
      query = query.eq('content_type', options.type);
    }
    if (options?.language && options.language !== 'All') {
      query = query.eq('language', options.language);
    }
    if (options?.mood && options.mood !== 'All' && options.mood !== 'all') {
      query = query.eq('mood', options.mood);
    }
    if (options?.limit) {
      query = query.limit(options.limit);
    }

    const { data, error } = await query;
    if (error) {
      return { writings: [], error: error.message };
    }
    return { writings: (data || []).map((row) => mapDatabaseWriting(row, options?.currentUserId)) };
  } catch (err) {
    return { writings: [], error: err instanceof Error ? err.message : String(err) };
  }
}

/**
 * Fetch a single writing by ID
 */
export async function fetchWritingById(
  id: string,
  currentUserId?: string
): Promise<{ writing?: WritingItem; error?: string }> {
  try {
    const { data, error } = await supabase
      .from('writings')
      .select('*, profiles(id, username, display_name, avatar_url)')
      .eq('id', id)
      .maybeSingle();

    if (error) {
      return { error: error.message };
    }
    if (!data) {
      return { error: 'Writing not found or removed.' };
    }

    // Check visibility permissions
    if (data.visibility === 'private' && data.user_id !== currentUserId) {
      return { error: 'This writing is private.' };
    }

    return { writing: mapDatabaseWriting(data, currentUserId) };
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

/**
 * Fetch user's own writings (all statuses)
 */
export async function fetchUserWritings(
  userId: string
): Promise<{ writings: WritingItem[]; drafts: DraftItem[]; error?: string }> {
  try {
    const { data, error } = await supabase
      .from('writings')
      .select('*')
      .eq('user_id', userId)
      .order('updated_at', { ascending: false });

    if (error) {
      return { writings: [], drafts: [], error: error.message };
    }

    const all = data || [];
    const drafts: DraftItem[] = all
      .filter((w) => w.status === 'draft' || w.visibility === 'private')
      .map((w) => ({
        id: w.id,
        title: w.title || 'Untitled reflection',
        content: w.content,
        type: (w.content_type || 'Thought') as WritingType,
        language: (w.language || 'Hindi') as Language,
        category: (w.mood || 'peace') as EmotionCategory,
        visibility: w.visibility as VisibilityPreference,
        status: 'draft',
        savedAt: formatWritingDate(w.updated_at),
        createdAt: w.created_at,
        updatedAt: w.updated_at,
      }));

    const publishedWritings: WritingItem[] = all
      .filter((w) => w.status === 'published' && w.visibility !== 'private')
      .map((w) => mapDatabaseWriting(w, userId));

    return { writings: publishedWritings, drafts };
  } catch (err) {
    return { writings: [], drafts: [], error: err instanceof Error ? err.message : String(err) };
  }
}

/**
 * Fetch user's saved writings
 */
export async function fetchUserSavedWritings(
  userId: string
): Promise<{ writings: WritingItem[]; error?: string }> {
  try {
    const { data, error } = await supabase
      .from('saved_writings')
      .select('writing_id, writings(*, profiles(id, username, display_name, avatar_url))')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      return { writings: [], error: error.message };
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const items = (data || []).map((row: any) => {
      if (!row.writings) return null;
      const mapped = mapDatabaseWriting(row.writings, userId);
      mapped.isSaved = true;
      return mapped;
    }).filter(Boolean) as WritingItem[];

    return { writings: items };
  } catch (err) {
    return { writings: [], error: err instanceof Error ? err.message : String(err) };
  }
}

/**
 * Fetch list of IDs saved by user
 */
export async function fetchUserSavedIds(userId: string): Promise<string[]> {
  try {
    const { data } = await supabase
      .from('saved_writings')
      .select('writing_id')
      .eq('user_id', userId);
    return (data || []).map((r) => r.writing_id);
  } catch {
    return [];
  }
}

/**
 * Toggle Save a writing
 */
export async function toggleSaveWriting(
  writingId: string,
  userId: string
): Promise<{ saved: boolean; error?: string }> {
  try {
    const { data: existing } = await supabase
      .from('saved_writings')
      .select('writing_id')
      .eq('user_id', userId)
      .eq('writing_id', writingId)
      .maybeSingle();

    if (existing) {
      const { error } = await supabase
        .from('saved_writings')
        .delete()
        .eq('user_id', userId)
        .eq('writing_id', writingId);
      if (error) return { saved: true, error: error.message };
      return { saved: false };
    } else {
      const { error } = await supabase
        .from('saved_writings')
        .insert({ user_id: userId, writing_id: writingId });
      if (error) return { saved: false, error: error.message };
      return { saved: true };
    }
  } catch (err) {
    return { saved: false, error: err instanceof Error ? err.message : String(err) };
  }
}

/**
 * Fetch user reactions
 */
export async function fetchUserReactions(
  userId: string
): Promise<Record<string, { felt?: boolean; stayed?: boolean; warmth?: boolean }>> {
  try {
    const { data } = await supabase
      .from('reactions')
      .select('writing_id, reaction_type')
      .eq('user_id', userId);

    const map: Record<string, { felt?: boolean; stayed?: boolean; warmth?: boolean }> = {};
    (data || []).forEach((r) => {
      if (!map[r.writing_id]) map[r.writing_id] = {};
      if (r.reaction_type === 'felt') map[r.writing_id].felt = true;
      if (r.reaction_type === 'stayed') map[r.writing_id].stayed = true;
      if (r.reaction_type === 'warmth') map[r.writing_id].warmth = true;
    });
    return map;
  } catch {
    return {};
  }
}

/**
 * Toggle Reaction
 */
export async function toggleReaction(
  writingId: string,
  reactionType: 'felt' | 'stayed' | 'warmth',
  userId: string
): Promise<{ active: boolean; error?: string }> {
  try {
    const { data: existing } = await supabase
      .from('reactions')
      .select('id')
      .eq('user_id', userId)
      .eq('writing_id', writingId)
      .eq('reaction_type', reactionType)
      .maybeSingle();

    if (existing) {
      const { error } = await supabase
        .from('reactions')
        .delete()
        .eq('id', existing.id);
      if (error) return { active: true, error: error.message };
      return { active: false };
    } else {
      const { error } = await supabase
        .from('reactions')
        .insert({
          user_id: userId,
          writing_id: writingId,
          reaction_type: reactionType,
        });
      if (error) return { active: false, error: error.message };
      return { active: true };
    }
  } catch (err) {
    return { active: false, error: err instanceof Error ? err.message : String(err) };
  }
}

/**
 * Create a new writing or draft
 */
export async function createWriting(
  data: {
    title?: string;
    content: string;
    type: WritingType;
    language: Language;
    mood?: string;
    visibility: VisibilityPreference;
    status: 'draft' | 'published';
  },
  userId: string
): Promise<{ writing?: WritingItem; error?: string }> {
  try {
    if (!data.content.trim()) {
      return { error: 'Please enter your words before saving.' };
    }

    const { data: created, error } = await supabase
      .from('writings')
      .insert({
        user_id: userId,
        title: data.title?.trim() || null,
        content: data.content.trim(),
        content_type: data.type,
        language: data.language,
        mood: data.mood || null,
        visibility: data.visibility,
        status: data.status,
      })
      .select('*, profiles(id, username, display_name, avatar_url)')
      .single();

    if (error) {
      return { error: error.message };
    }

    return { writing: mapDatabaseWriting(created, userId) };
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

/**
 * Update an existing writing
 */
export async function updateWriting(
  id: string,
  updates: Partial<{
    title: string | null;
    content: string;
    type: WritingType;
    language: Language;
    mood: string | null;
    visibility: VisibilityPreference;
    status: 'draft' | 'published';
  }>,
  userId: string
): Promise<{ writing?: WritingItem; error?: string }> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const payload: any = {
      updated_at: new Date().toISOString(),
    };
    if (updates.title !== undefined) payload.title = updates.title?.trim() || null;
    if (updates.content !== undefined) payload.content = updates.content.trim();
    if (updates.type !== undefined) payload.content_type = updates.type;
    if (updates.language !== undefined) payload.language = updates.language;
    if (updates.mood !== undefined) payload.mood = updates.mood;
    if (updates.visibility !== undefined) payload.visibility = updates.visibility;
    if (updates.status !== undefined) payload.status = updates.status;

    const { data: updated, error } = await supabase
      .from('writings')
      .update(payload)
      .eq('id', id)
      .eq('user_id', userId)
      .select('*, profiles(id, username, display_name, avatar_url)')
      .single();

    if (error) {
      return { error: error.message };
    }

    return { writing: mapDatabaseWriting(updated, userId) };
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

/**
 * Delete a writing
 */
export async function deleteWriting(
  id: string,
  userId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase
      .from('writings')
      .delete()
      .eq('id', id)
      .eq('user_id', userId);

    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : String(err) };
  }
}

/**
 * Comments
 */
export async function fetchComments(writingId: string, currentUserId?: string): Promise<CommentItem[]> {
  try {
    const { data, error } = await supabase
      .from('comments')
      .select('id, writing_id, user_id, content, created_at, profiles(id, username, display_name)')
      .eq('writing_id', writingId)
      .order('created_at', { ascending: true });

    if (error || !data) return [];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return data.map((c: any) => ({
      id: c.id,
      writingId: c.writing_id,
      userId: c.user_id,
      authorName: c.profiles?.display_name || c.profiles?.username || 'Reader',
      authorUsername: c.profiles?.username,
      content: c.content,
      createdAt: formatWritingDate(c.created_at),
      isOwn: currentUserId ? c.user_id === currentUserId : false,
    }));
  } catch {
    return [];
  }
}

export async function addComment(
  writingId: string,
  content: string,
  userId: string
): Promise<{ comment?: CommentItem; error?: string }> {
  try {
    if (!content.trim()) return { error: 'Please enter a response.' };
    const { data, error } = await supabase
      .from('comments')
      .insert({
        writing_id: writingId,
        user_id: userId,
        content: content.trim(),
      })
      .select('id, writing_id, user_id, content, created_at, profiles(id, username, display_name)')
      .single();

    if (error) return { error: error.message };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const c = data as any;
    return {
      comment: {
        id: c.id,
        writingId: c.writing_id,
        userId: c.user_id,
        authorName: c.profiles?.display_name || c.profiles?.username || 'Reader',
        authorUsername: c.profiles?.username,
        content: c.content,
        createdAt: 'Just now',
        isOwn: true,
      }
    };
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

export async function deleteComment(
  commentId: string,
  userId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase
      .from('comments')
      .delete()
      .eq('id', commentId)
      .eq('user_id', userId);

    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : String(err) };
  }
}

/**
 * Content Reporting
 */
export async function submitReport(
  writingId: string,
  reason: string,
  details: string | undefined,
  userId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase
      .from('reports')
      .insert({
        writing_id: writingId,
        reporter_id: userId,
        reason,
        details: details?.trim() || null,
        status: 'pending',
      });

    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : String(err) };
  }
}

