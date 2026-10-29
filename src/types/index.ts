export type EmotionCategory = 
  | 'all'
  | 'hope'
  | 'nostalgia'
  | 'heartbreak'
  | 'peace'
  | 'confusion'
  | 'gratitude'
  | 'loneliness'
  | 'new beginnings'
  | 'everyday life';

export type WritingType = 
  | 'Thought'
  | 'Sher & Shayari'
  | 'Poetry'
  | 'Personal Reflection'
  | 'Story'
  | 'Unsent Letter'
  | 'Quote'
  | 'Observation'
  | 'Other';

export type Language = 
  | 'English'
  | 'Hindi'
  | 'Marathi'
  | 'Urdu'
  | 'Hinglish'
  | 'Other';

export type VisibilityPreference = 'public' | 'anonymous' | 'private';

export type UnsentLetterCategory = 
  | 'To Someone I Miss'
  | 'To My Younger Self'
  | 'To Someone I Never Thanked'
  | 'To the Past'
  | 'To the Future'
  | 'To Life';

export interface WritingItem {
  id: string;
  userId?: string;
  title?: string;
  content: string;
  author: string;
  authorUsername?: string;
  authorAvatar?: string;
  isAnonymous?: boolean;
  type: WritingType;
  language: Language;
  category: EmotionCategory | string;
  visibility?: VisibilityPreference;
  status?: 'draft' | 'published' | 'archived';
  createdAt?: string;
  updatedAt?: string;
  dateApprox?: string;
  isPaperStyle?: boolean;
  scriptStyle?: 'devanagari' | 'nastaliq' | 'serif' | 'sans';
  // Quiet resonance signals (user's personal connection)
  feltCount?: number;
  userFelt?: boolean;
  stayedCount?: number;
  userStayed?: boolean;
  warmthCount?: number;
  userWarmth?: boolean;
  isSaved?: boolean;
}

export interface UnsentLetterItem {
  id: string;
  recipient: string;
  preview: string;
  fullText: string;
  author: string;
  category: UnsentLetterCategory | string;
  dateText: string;
  postscript?: string;
  language?: Language;
  isAnonymous?: boolean;
  userId?: string;
  createdAt?: string;
}

export interface CommentItem {
  id: string;
  writingId: string;
  userId: string;
  authorName: string;
  authorUsername?: string;
  content: string;
  createdAt: string;
  isOwn?: boolean;
}

export interface DraftItem {
  id: string;
  title: string;
  content: string;
  type: WritingType;
  language: Language;
  category: EmotionCategory | string;
  visibility: VisibilityPreference;
  status: 'draft';
  savedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile {
  id: string;
  username: string;
  displayName: string;
  bio: string;
  avatarUrl?: string;
  preferredLanguage: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface TeaserFragment {
  id: string;
  lines: string[];
  theme: string;
  sourceNote?: string;
  language?: Language;
}
