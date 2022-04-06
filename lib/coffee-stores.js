// constants
const RESULT_LIMIT = 6;

// initialize unsplash
import { createApi } from 'unsplash-js';

const unsplashApi = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY,
  //...other fetch options
});

const getUrlForCoffeeStores = (latLong, query, limit) =>
  `https://api.foursquare.com/v3/places/search?ll=${latLong}&query=${query}&limit=${limit}`;

const fetchCoffeeStorePhotos = async () => {
  const data = await unsplashApi.search.getPhotos({
    query: 'coffee shop',
    page: 1,
    perPage: RESULT_LIMIT,
  });

  const unsplashResults = data.response.results;

  return unsplashResults.map((result) => result.urls['small']);
};

export const fetchCoffeeStores = async () => {
  const photos = await fetchCoffeeStorePhotos();

  const response = await fetch(
    getUrlForCoffeeStores('20.673147,-103.358933', 'cafe', RESULT_LIMIT),
    {
      headers: {
        Accept: 'application/json',
        Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY,
      },
    }
  );

  const data = await response.json();

  return data.results.map((result, idx) => ({
    id: result.fsq_id,
    name: result.name,
    address: result.location.formatted_address,
    neighborhood:
      result.location.neighborhood || result.location.cross_street || '',
    imgUrl: photos[idx],
  }));
};
