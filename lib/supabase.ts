import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 * Returns a configured Supabase client, or null when env vars are absent.
 * When null, callers fall back to the local markdown content in /content.
 * This keeps local dev and previews working with zero infrastructure while
 * letting production pull frequently-changing project content from Supabase.
 */
export function getSupabase(): SupabaseClient | null {
  if (!url || !anonKey) return null;
  return createClient(url, anonKey, {
    auth: { persistSession: false },
  });
}

export const isSupabaseConfigured = Boolean(url && anonKey);
