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
  title?: string;
  content: string;
  author: string;
  isAnonymous?: boolean;
  type: WritingType;
  language: Language;
  category: EmotionCategory;
  visibility?: VisibilityPreference;
  dateApprox?: string;
  isPaperStyle?: boolean; // Renders on warm ivory surface
  scriptStyle?: 'devanagari' | 'nastaliq' | 'serif' | 'sans';
  // Quiet resonance signals (not public competitions)
  feltCount?: number;
  userFelt?: boolean;
  stayedCount?: number;
  userStayed?: boolean;
  warmthCount?: number;
  userWarmth?: boolean;
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
}

export interface DraftItem {
  id: string;
  title: string;
  content: string;
  type: WritingType;
  language: Language;
  category: EmotionCategory;
  visibility: VisibilityPreference;
  savedAt: string;
}

export interface UserProfile {
  penName: string;
  bio: string;
  preferredLanguages: Language[];
  isAnonymousDefault: boolean;
  joinedDate: string;
}

export interface TeaserFragment {
  id: string;
  lines: string[];
  theme: string;
  sourceNote?: string;
  language?: Language;
}
