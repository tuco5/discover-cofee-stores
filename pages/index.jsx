import Head from 'next/head';
import Image from 'next/image';
import { useEffect } from 'react/cjs/react.production.min';

import Banner from '../components/banner';
import Card from '../components/card';
import useTrackLocation from '../hooks/use-track-location';
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

export default function Home({ coffeeStores }) {
  const { handleTrackLocation, latLong, locationErrorMsg, isFindingLocation } =
    useTrackLocation();

  useEffect(() => {
    async function fetchData() {
      if (latLong) {
        try {
          const fetchedCoffeeStores = await fetchCoffeeStores(latLong);
          console.log({ fetchedCoffeeStores });
        } catch (error) {
          console.log({ error });
        }
      }
    }
    fetchData();
  }, [latLong]);

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
            <h2 className={styles.heading2}>Guadalajara stores</h2>
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
      </main>
    </div>
  );
}
