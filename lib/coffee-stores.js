export const getUrlForCoffeeStores = (latLong, query, limit) =>
  `https://api.foursquare.com/v3/places/search?ll=${latLong}&query=${query}&limit=${limit}`;

export const fetchCoffeeStores = async () => {
  const response = await fetch(
    getUrlForCoffeeStores('20.673147,-103.358933', 'cafe', 6),
    {
      headers: {
        Accept: 'application/json',
        Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY,
      },
    }
  );

  const data = await response.json();
  console.log('printing data: ', data.results);
  return data.results;
};
