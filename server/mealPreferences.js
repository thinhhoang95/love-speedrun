const REQUEST_TIMEOUT_MS = 7_000;
const MEAL_TYPES = new Set(['standard', 'vegetarian']);
const LANGUAGES = new Set(['vi', 'en', 'fr', 'zh', 'ja']);

function httpError(message, status) {
  const error = new Error(message);
  error.status = status;
  return error;
}

export function validateMealPreference(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    throw httpError('Invalid request body', 400);
  }

  const name = String(input.name || '').trim();
  const mealType = String(input.mealType || '');
  const notes = String(input.notes || '').trim();
  const language = LANGUAGES.has(input.language) ? input.language : 'vi';

  if (!name || name.length > 80) throw httpError('Guest name is required and must not exceed 80 characters', 400);
  if (!MEAL_TYPES.has(mealType)) throw httpError('Invalid meal type', 400);
  if (notes.length > 1000) throw httpError('Notes must not exceed 1000 characters', 400);

  return {
    name,
    meal_type: mealType,
    vegetarian_menu: mealType === 'vegetarian' ? 'set-01' : null,
    notes: notes || null,
    language,
  };
}

export async function saveMealPreference(input, {
  fetchImpl = fetch,
  url = process.env.NEXT_PUBLIC_SUPABASE_URL,
  key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  signal = AbortSignal.timeout(REQUEST_TIMEOUT_MS),
} = {}) {
  const preference = validateMealPreference(input);
  if (!url || !key) throw httpError('Meal request service is not configured', 503);

  const response = await fetchImpl(`${url}/rest/v1/meal_preferences`, {
    method: 'POST',
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify(preference),
    signal,
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => '');
    console.error('Supabase meal preference insert failed:', response.status, detail.slice(0, 300));
    throw httpError('Could not save meal request', 502);
  }

  return { ok: true };
}
