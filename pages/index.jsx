import Head from 'next/head';
import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';
import useTrackLocation from '../hooks/use-track-location';
import { ACTION_TYPES, StoreContext } from '../context/store-context';

import Banner from '../components/banner';
import Card from '../components/card';
import { fetchCoffeeStores } from '../lib/coffee-stores';

import styles from '../styles/Home.module.scss';

export async function getStaticProps(context) {
  const coffeeStores = await fetchCoffeeStores();

  return {
    props: {
      coffeeStores,
    }, // will be passed to the page component as props
  };
}

export default function Home(props) {
  const { handleTrackLocation, locationErrorMsg, isFindingLocation } =
    useTrackLocation();

  const [coffeeStoresError, setCoffeeStoresError] = useState(null);

  const { dispatch, state } = useContext(StoreContext);

  const { coffeeStores, latLong } = state;

  useEffect(() => {
    async function fetchData() {
      if (latLong) {
        try {
          const fetchedCoffeeStores = await fetchCoffeeStores(latLong, 30);
          dispatch({
            type: ACTION_TYPES.SET_COFFEE_STORES,
            payload: {
              coffeeStores: fetchedCoffeeStores,
            },
          });
        } catch (error) {
          setCoffeeStoresError(error.message);
        }
      }
    }
    fetchData();
  }, [latLong, dispatch]);

  const HandleOnBannerBtnClick = () => {
    handleTrackLocation();
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Coffee Connoisseur</title>
        <meta
          name="description"
          content="Coffee stores near by me finder landing page."
        />
      </Head>

      <main className={styles.main}>
        <Banner
          buttonText={isFindingLocation ? 'Locating...' : 'view stores nearby'}
          handleOnClick={HandleOnBannerBtnClick}
        />
        {locationErrorMsg && <p>Something went wrong: {locationErrorMsg}</p>}
        {coffeeStoresError && <p>Something went wrong: {coffeeStoresError}</p>}

        <div className={styles.heroImage}>
          <Image
            src="/static/hero-image.png"
            alt="hero image"
            width={700}
            height={400}
          />
        </div>

        {coffeeStores.length > 0 && (
          <div className={styles.sectionWrapper}>
            <h2 className={styles.heading2}>Stores near me</h2>
            <div className={styles.cardLayout}>
              {coffeeStores.map(({ id, name, imgUrl, ...otherProps }) => (
                <Card
                  key={id}
                  className={styles.card}
                  name={name}
                  imgUrl={imgUrl}
                  href={`/coffee-store/${id}`}
                  {...otherProps}
                />
              ))}
            </div>
          </div>
        )}

        {props.coffeeStores.length > 0 && (
          <div className={styles.sectionWrapper}>
            <h2 className={styles.heading2}>Guadalajara stores</h2>
            <div className={styles.cardLayout}>
              {props.coffeeStores.map(({ id, name, imgUrl, ...otherProps }) => (
                <Card
                  key={id}
                  className={styles.card}
                  name={name}
                  imgUrl={imgUrl}
                  href={`/coffee-store/${id}`}
                  {...otherProps}
                />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
