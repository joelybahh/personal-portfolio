import "server-only";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

/** Server-only Supabase client (bypasses RLS). Used for reactions and seeding. */
export function getSupabaseAdmin(): SupabaseClient | null {
  if (!url || !serviceRoleKey) return null;
  return createClient(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export function isReactionsConfigured(): boolean {
  return Boolean(url && serviceRoleKey && process.env.REACTIONS_VOTER_SECRET);
}
