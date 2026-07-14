import test from 'node:test';
import assert from 'node:assert/strict';
import { getWishStats } from './wishStats.js';

const config = {
  url: 'https://example.supabase.co',
  key: 'publishable-key',
  signal: undefined,
};

test('adds the display offset to the live Supabase count', async () => {
  const stats = await getWishStats({
    ...config,
    fetchImpl: async () => new Response(null, {
      status: 200,
      headers: { 'content-range': '0-9/10' },
    }),
  });

  assert.equal(stats.count, 34);
  assert.equal(stats.countryCount, 6);
});

test('returns baseline stats when Supabase cannot be reached', async () => {
  const stats = await getWishStats({
    ...config,
    fetchImpl: async () => {
      throw new TypeError('fetch failed');
    },
  });

  assert.equal(stats.count, 24);
  assert.equal(stats.countryCount, 6);
});

test('returns baseline stats for missing configuration or invalid responses', async () => {
  const missingConfig = await getWishStats({ url: '', key: '', signal: undefined });
  const invalidResponse = await getWishStats({
    ...config,
    fetchImpl: async () => new Response(null, { status: 503 }),
  });

  assert.equal(missingConfig.count, 24);
  assert.equal(invalidResponse.count, 24);
});
