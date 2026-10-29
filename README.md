# ANKAHE (अनकहे)

> *"For everything you couldn't say."*  
> *"कुछ बातें सिर्फ़ कागज़ और ख़ामोशी ही समझ पाते हैं।"*

ANKAHE is a multilingual writing community and personal sanctuary on the internet for unspoken feelings, personal thoughts, sher, shayari, poetry, quotes, memories, reflections, and unsent letters. It is built as a community-first haven, rejecting the vanity metrics, algorithmic pressure, and commercial noise of mainstream social media.

---

## 🌟 Core Philosophy & Data Integrity

- **Zero Fake Content:** Clean, real database operation. No fabricated users, profiles, posts, fake follower counts, engagement bots, or simulated likes.
- **Intentional Empty States:** When a space is new or empty, it provides a peaceful, literary empty state rather than disguising hardcoded data as user activity.
- **Zero Vanity Metrics:** No follower counts, no popularity rankings, no leaderboards, no addictive engagement mechanics.
- **Zero Commercial Distractions:** No advertisements, no monetisation pressure, no tracking cookies.
- **Quiet Resonances:** Readers interact gently through emotional affirmations (*"Felt this"*, *"Stayed with me"*, *"Warmth"*).
- **Multilingual Dignity:** Built from the ground up for Hindi, Marathi, Hinglish, English, and right-to-left Urdu with script-tailored typography.
- **Privacy & Anonymity Choice:** Complete freedom to publish under a chosen pen name, share completely anonymously without profile links, or store private personal drafts.

---

## 🏛️ Application Routes & Features

```
ANKAHE Architecture
├── Public Routes
│   ├── /                 -> Phase 1 Cinematic Teaser (Preserved 100% intact)
│   ├── /about            -> Mission & Editorial Soul ("A place for the words we keep inside")
│   ├── /principles       -> Community Principles & Ethics
│   ├── /login            -> Supabase Email/Password Login & Password Recovery
│   ├── /signup           -> Real Supabase Signup with Pen Name, Handle & Primary Tongue
│   ├── /forgot-password  -> Password Recovery Request
│   ├── /reset-password   -> Secret Password Update
│   └── /auth/callback    -> Email Verification & OAuth Callback Handler
│
├── Public Community Reading Routes
│   ├── /home             -> Welcoming Community Stream & Writing Prompt
│   ├── /discover         -> Real-time Database Search & Multi-Filter Engine
│   ├── /unsent-letters   -> Published Community Unsent Letters (6 Categories)
│   ├── /quiet-corner     -> Minimalist Sanctuary Reading Space (Zero distractions)
│   └── /writing/:id      -> Individual Piece Page with Full Typography, Responses & Reporting
│
└── Authenticated Personal Routes (Protected)
    ├── /write            -> Distraction-Free Studio (Draft / Public / Anonymous)
    ├── /my-space         -> Personal Library (Drafts, Published, Letters, Saved)
    ├── /profile          -> Writer Persona & Biography Management
    └── /settings         -> Reading Preferences, Password Update, Account Deletion
```

---

## 🛡️ Database & Security Architecture

The application connects to PostgreSQL via Supabase with strict Row Level Security (RLS) policies:

1. **`profiles`:**
   - Publicly readable profile details (`username`, `display_name`, `bio`, `preferred_language`).
   - Mutations strictly restricted to the authenticated account holder (`auth.uid() = id`).
   - Auto-provisioned via database trigger on new signup in `auth.users`.
2. **`writings`:**
   - Author can always read, update, and delete their own writings (`auth.uid() = user_id`).
   - Published public and anonymous writings are viewable by all.
   - Private drafts (`visibility = 'private'` or `status = 'draft'`) can **never** be accessed by other users or unauthenticated visitors.
3. **`public_writings` (Security View):**
   - Automatically masks `user_id`, `username`, and `avatar_url` when `visibility = 'anonymous'` to ensure author identity is never leaked in public queries.
4. **`saved_writings`:**
   - Strictly private to the owning user (`auth.uid() = user_id`).
5. **`reactions` & `comments`:**
   - Allowed only on eligible published pieces.
   - Deletion strictly enforced by authorship.
6. **`reports`:**
   - Reporters can view only their own filed reports. Moderation actions remain secure.

### Applying Database Migrations

Migration files are stored in `supabase/migrations/`:
- `supabase/migrations/20261029000000_ankahe_schema_and_rls.sql`

To apply to your Supabase project:
1. Open your Supabase Dashboard: **SQL Editor**.
2. Run the migration script in `supabase/migrations/20261029000000_ankahe_schema_and_rls.sql`.

---

## 🎨 Visual Design Language & Palette

The platform uses a carefully curated, deep editorial palette:

| Token | Hex | Role |
| :--- | :--- | :--- |
| **`ankahe-bg`** | `#111216` | Primary background, deep midnight charcoal |
| **`ankahe-secondary`** | `#191A20` | Cards, sidebars, modal surfaces |
| **`ankahe-elevated`** | `#202127` | Interactive pill buttons, elevated surfaces |
| **`ankahe-text`** | `#F3EFE8` | Warm ivory for headings and primary text |
| **`ankahe-muted`** | `#AAA6A1` | Soft warm grey for secondary reflections and metadata |
| **`ankahe-gold`** | `#C7A878` | Muted gold accents, Urdu/Devanagari highlights, active states |
| **`ankahe-border`** | `#34343A` | Restrained architectural outlines |
| **`ankahe-paper`** | `#F2EDE4` | Warm paper stationery for letters and high-contrast buttons |
| **`ankahe-ink`** | `#292722` | Dark ink typography on paper stationery surfaces |

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v20+ recommended)
- Supabase account & project

### Configuration

Copy `.env.example` to `.env` and fill in your Supabase project URL and anon/publishable key:

```bash
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-supabase-publishable-key
```

### Installation & Scripts

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run tests:
   ```bash
   npm test
   ```

3. Run linting:
   ```bash
   npm run lint
   ```

4. Build for production:
   ```bash
   npm run build
   ```

5. Preview production build locally:
   ```bash
   npm run preview
   ```
