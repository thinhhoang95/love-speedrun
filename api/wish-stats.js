import { getWishStats } from '../server/wishStats.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const result = await getWishStats();
    res.status(200).json(result);
  } catch (err) {
    console.error('wish-stats failed:', err);
    res.status(500).json({ error: 'Could not load wish stats.' });
  }
}
