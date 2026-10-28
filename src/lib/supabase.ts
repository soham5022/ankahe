import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabasePublishableKey && 
  supabaseUrl !== 'https://your-project-id.supabase.co' &&
  supabasePublishableKey !== 'your-supabase-publishable-or-anon-key'
);

if (!isSupabaseConfigured) {
  console.warn(
    '[ANKAHE Supabase] Credentials are missing or incomplete. ' +
    'Please set VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY in your .env file. ' +
    'Obtain them from the Supabase Dashboard: Project Settings > API.'
  );
}

// Reusable Supabase client instance
// Uses a dummy fallback if unconfigured during development to prevent immediate runtime crashes
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabasePublishableKey || 'placeholder-key',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  }
);

/**
 * Diagnostic utility to test backend connectivity
 * Checks if Supabase server responds without throwing unhandled exceptions
 */
export async function testSupabaseConnection(): Promise<{
  connected: boolean;
  message: string;
  url?: string;
}> {
  if (!isSupabaseConfigured) {
    return {
      connected: false,
      message: 'Supabase credentials are not configured in .env',
      url: supabaseUrl,
    };
  }

  try {
    // Attempt a light ping by querying auth or health
    const { error } = await supabase.auth.getSession();
    if (error) {
      return {
        connected: false,
        message: `Connection error: ${error.message}`,
        url: supabaseUrl,
      };
    }

    return {
      connected: true,
      message: 'Successfully reached Supabase backend.',
      url: supabaseUrl,
    };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    return {
      connected: false,
      message: `Failed to connect to Supabase: ${errorMsg}`,
      url: supabaseUrl,
    };
  }
}
