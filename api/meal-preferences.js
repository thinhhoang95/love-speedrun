import { saveMealPreference } from '../server/mealPreferences.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    res.status(201).json(await saveMealPreference(req.body));
  } catch (error) {
    console.error('meal-preferences failed:', error);
    const status = Number.isInteger(error.status) ? error.status : 500;
    res.status(status).json({ error: status < 500 ? error.message : 'Could not save meal request.' });
  }
}
