import { getFieldRecords, table } from '../../../lib/airtable';
import { fetchCoffeeStores } from '../../../lib/coffee-stores';

export default async function handler(req, res) {
  // READ ALL
  if (req.method === 'GET') {
    try {
      const { latLong, limit } = req.query;
      const response = await fetchCoffeeStores(latLong, limit);
      res.status(200).json(response);
    } catch (err) {
      res.status(500).json({ message: 'Something went wrong.', err });
    }

    // CREATE
  } else if (req.method === 'POST') {
    const { id, name, neighbourhood, address, imgUrl, voting } = req.body;

    if (id) {
      try {
        const coffeeStoreById = await table
          .select({
            filterByFormula: `id="${id}"`,
          })
          .firstPage();

        // IF RECORD EXIST:
        if (coffeeStoreById.length !== 0) {
          // return it.
          res.json(getFieldRecords(coffeeStoreById));

          // IF RECORD DOES NOT EXIST
        } else {
          // create it
          if (name) {
            const recordsCreated = await table.create([
              {
                fields: { id, name, neighbourhood, address, imgUrl, voting },
              },
            ]);

            res.json(getFieldRecords(recordsCreated));
          } else {
            res.status(400).json({ message: 'Name is missing' });
          }
        }
      } catch (err) {
        res.status(500).json('Error creating or finding store', err.message);
      }
    } else {
      res.status(400).json({ message: 'Id is missing' });
    }
  }
}
