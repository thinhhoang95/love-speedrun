import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.NEXT_PUBLIC_SUPABASE_URL,
  import.meta.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
);

export async function saveScore(name, score, rank) {
  const { data, error } = await supabase
    .from('leaderboard')
    .insert({ name: name.trim() || 'Vô danh', score, rank })
    .select('id')
    .single();
  if (error) throw error;
  return data.id;
}

export async function getLeaderboard() {
  const { data, error } = await supabase
    .from('leaderboard')
    .select('id, name, score, rank')
    .order('score', { ascending: false })
    .limit(10);
  if (error) throw error;
  return data ?? [];
}
