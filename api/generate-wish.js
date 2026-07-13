import { generateWish } from '../server/generateWish.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const result = await generateWish(req.body ?? {});
    res.status(200).json(result);
  } catch (err) {
    console.error('generate-wish failed:', err);
    res.status(err.status || 500).json({
      error: err.status && err.status < 500 ? err.message : 'Không tạo được lời chúc lúc này.',
    });
  }
}
