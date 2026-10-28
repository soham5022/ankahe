# ANKAHE (अनकहे)

> *"For everything you couldn't say."*  
> *"कुछ बातें सिर्फ़ कागज़ और ख़ामोशी ही समझ पाते हैं।"*

ANKAHE is a sanctuary on the internet for unspoken feelings, personal thoughts, sher, shayari, poetry, quotes, memories, and unsent letters. It is built as a community-first literary haven, rejecting the vanity metrics, algorithmic pressure, and commercial noise of mainstream social media.

---

## 🌟 Core Philosophy

- **Zero Vanity Metrics:** No follower counts, no popularity rankings, no leaderboards, no public likes.
- **Zero Commercial Distractions:** No advertisements, no subscriptions, no monetisation pressure.
- **Quiet Resonances:** Readers interact gently through emotional affirmations (*"Felt this"*, *"Stayed with me"*, *"Warmth"*).
- **Multilingual Dignity:** Built from the ground up for Hindi, Marathi, Hinglish, English, and right-to-left Urdu with script-tailored typography.
- **Privacy & Anonymity Choice:** Complete freedom to publish under a chosen pen name, share completely anonymously without profile links, or keep private session drafts.

---

## 🏛️ Application Architecture

### Phase 1 — The Cinematic Public Teaser (`/`)
An interactive, curiosity-driven narrative experience designed like a short-film teaser:
$$\text{CURIOSITY} \longrightarrow \text{RECOGNITION} \longrightarrow \text{CONNECTION} \longrightarrow \text{PERSONAL PAUSE} \longrightarrow \text{REVELATION} \longrightarrow \text{INVITATION}$$

- **Hindi Opening Fragment:** *"कभी कुछ कहना था... पर कह नहीं पाए?"*
- **Four Emotional Moments:**
  1. *Something Unsaid* — Late-night unspoken words.
  2. *An Unsent Letter* — Warm stationery envelope and letters that never found their way.
  3. *A Memory* — Multilingual reflections in Marathi and Hindi (*"काही आठवणी अश्रू आणत नाहीत..."*).
  4. *A Little Hope* — Gentle affirmations of quiet resilience.
- **The Personal Pause & Revelation:** Transition from curiosity to the full revelation of ANKAHE.

### Phase 2 — The Complete Community Experience
A coherent application layout featuring 11 dedicated pages and a shared community shell:

```
ANKAHE Architecture
├── Public Routes
│   ├── /                 -> Phase 1 Cinematic Teaser (Preserved 100% intact)
│   ├── /about            -> Mission & Editorial Soul ("A place for the words we keep inside")
│   ├── /principles       -> Community Principles & Ethics
│   ├── /login            -> Authentication Prototype & Guest Entry
│   └── /signup           -> Session Pen Name & Identity Setup
│
└── Community Routes (Wrapped in CommunityLayout)
    ├── /home             -> Welcoming Community Stream & Writing Prompt
    ├── /discover         -> Multi-Filter Client-Side Search (Category, Language, Mood)
    ├── /write            -> Distraction-Free Writing Studio with Live Preview
    ├── /unsent-letters   -> Dedicated Unsent Letters Collection (6 Categories)
    ├── /quiet-corner     -> Sanctuary Reading Space (Zero engagement pressure)
    ├── /my-space         -> Personal Space (Drafts, Saved, Session Posts, Preferences)
    └── /profile          -> Writer-Focused Profile Prototype
```

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
- Node.js (v18 or higher recommended)
- npm or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/soham5022/ankahe.git
   cd ankahe
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open your browser:
   - Teaser: `http://localhost:5173/`
   - Community Home: `http://localhost:5173/home`

### Build for Production

```bash
npm run build
```

---

## 🔮 Phase 3 Roadmap (Planned)

1. **Cloud Database (Supabase / PostgreSQL):**
   - Persistent tables for profiles, writings, letters, bookmarks, and drafts.
   - Row-Level Security (RLS) policies.
2. **Real Authentication:**
   - Passwordless email magic links and Google OAuth.
3. **Cross-Device Persistent Storage:**
   - Multi-device draft synchronization.
   - Cloud backup of saved bookmarks and reading preferences.
4. **Community Moderation & Reporting:**
   - Automated content safety filters and human flag queue for harassment prevention.

---

## 📜 License

Created with care for authentic human expression.
