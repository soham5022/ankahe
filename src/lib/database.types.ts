export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          username: string;
          display_name: string | null;
          bio: string | null;
          avatar_url: string | null;
          preferred_language: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          username: string;
          display_name?: string | null;
          bio?: string | null;
          avatar_url?: string | null;
          preferred_language?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          username?: string;
          display_name?: string | null;
          bio?: string | null;
          avatar_url?: string | null;
          preferred_language?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      writings: {
        Row: {
          id: string;
          user_id: string;
          title: string | null;
          content: string;
          content_type: string;
          language: string;
          mood: string | null;
          visibility: 'public' | 'anonymous' | 'private';
          status: 'draft' | 'published' | 'archived';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title?: string | null;
          content: string;
          content_type?: string;
          language?: string;
          mood?: string | null;
          visibility?: 'public' | 'anonymous' | 'private';
          status?: 'draft' | 'published' | 'archived';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string | null;
          content?: string;
          content_type?: string;
          language?: string;
          mood?: string | null;
          visibility?: 'public' | 'anonymous' | 'private';
          status?: 'draft' | 'published' | 'archived';
          created_at?: string;
          updated_at?: string;
        };
      };
      saved_writings: {
        Row: {
          user_id: string;
          writing_id: string;
          created_at: string;
        };
        Insert: {
          user_id: string;
          writing_id: string;
          created_at?: string;
        };
        Update: {
          user_id?: string;
          writing_id?: string;
          created_at?: string;
        };
      };
      reactions: {
        Row: {
          id: string;
          user_id: string;
          writing_id: string;
          reaction_type: 'felt' | 'stayed' | 'warmth';
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          writing_id: string;
          reaction_type: 'felt' | 'stayed' | 'warmth';
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          writing_id?: string;
          reaction_type?: 'felt' | 'stayed' | 'warmth';
          created_at?: string;
        };
      };
      comments: {
        Row: {
          id: string;
          user_id: string;
          writing_id: string;
          content: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          writing_id: string;
          content: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          writing_id?: string;
          content?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      reports: {
        Row: {
          id: string;
          reporter_id: string;
          writing_id: string;
          reason: string;
          details: string | null;
          status: 'pending' | 'reviewed' | 'dismissed';
          created_at: string;
        };
        Insert: {
          id?: string;
          reporter_id: string;
          writing_id: string;
          reason: string;
          details?: string | null;
          status?: 'pending' | 'reviewed' | 'dismissed';
          created_at?: string;
        };
        Update: {
          id?: string;
          reporter_id?: string;
          writing_id?: string;
          reason?: string;
          details?: string | null;
          status?: 'pending' | 'reviewed' | 'dismissed';
          created_at?: string;
        };
      };
    };
    Views: {
      public_writings: {
        Row: {
          id: string;
          title: string | null;
          content: string;
          content_type: string;
          language: string;
          mood: string | null;
          visibility: 'public' | 'anonymous' | 'private';
          status: 'draft' | 'published' | 'archived';
          created_at: string;
          updated_at: string;
          author_id: string | null;
          author_name: string;
          author_username: string | null;
          author_avatar: string | null;
        };
      };
    };
  };
}

