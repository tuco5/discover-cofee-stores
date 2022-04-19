import { fetchCoffeeStores } from '../../../lib/coffee-stores';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { latLong, limit } = req.query;
      const response = await fetchCoffeeStores(latLong, limit);
      res.status(200).json(response);
    } catch (err) {
      res.status(500).json({ message: 'Something went wrong.', err });
    }
  } else {
    res.status(400).json({ message: 'Bad Request.' });
  }
}
