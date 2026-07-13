// wishes.js — shared guest book ("Lời chúc phúc") backed by Supabase.
// Mirrors leaderboard.js: same client, gentle failure handling upstream.
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.NEXT_PUBLIC_SUPABASE_URL,
  import.meta.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
);

export async function saveWish(name, message) {
  const { data, error } = await supabase
    .from('wishes')
    .insert({
      name: name.trim() || 'Ẩn danh',
      message: message.trim(),
      created_at: new Date().toISOString(),
    })
    .select('id, name, message, created_at')
    .single();
  if (error) throw error;
  return data;
}

export async function getWishes() {
  const { data, error } = await supabase
    .from('wishes')
    .select('id, name, message, created_at')
    .order('created_at', { ascending: false })
    .limit(200);
  if (error) throw error;
  return data ?? [];
}
