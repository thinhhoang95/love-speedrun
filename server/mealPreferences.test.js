import assert from 'node:assert/strict';
import test from 'node:test';
import { saveMealPreference, validateMealPreference } from './mealPreferences.js';

test('validates a standard meal request and clears vegetarian menu', () => {
  assert.deepEqual(validateMealPreference({
    name: '  Nguyễn Văn An  ',
    mealType: 'standard',
    vegetarianMenu: 'set-04',
    notes: ' No peanuts ',
    language: 'en',
  }), {
    name: 'Nguyễn Văn An',
    meal_type: 'standard',
    vegetarian_menu: null,
    notes: 'No peanuts',
    language: 'en',
  });
});

test('always assigns vegetarian guests to the only available set', () => {
  assert.equal(validateMealPreference({
    name: 'Guest',
    mealType: 'vegetarian',
    vegetarianMenu: 'set-10',
  }).vegetarian_menu, 'set-01');
});

test('posts a normalized vegetarian request to Supabase', async () => {
  let request;
  const fetchImpl = async (url, options) => {
    request = { url, options };
    return new Response(null, { status: 201 });
  };

  const result = await saveMealPreference({
    name: 'Guest',
    mealType: 'vegetarian',
    vegetarianMenu: 'set-10',
    notes: '',
    language: 'fr',
  }, {
    fetchImpl,
    url: 'https://example.supabase.co',
    key: 'public-key',
    signal: undefined,
  });

  assert.deepEqual(result, { ok: true });
  assert.equal(request.url, 'https://example.supabase.co/rest/v1/meal_preferences');
  assert.deepEqual(JSON.parse(request.options.body), {
    name: 'Guest',
    meal_type: 'vegetarian',
    vegetarian_menu: 'set-01',
    notes: null,
    language: 'fr',
  });
});
