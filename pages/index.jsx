import Head from 'next/head';
import Image from 'next/image';

import Banner from '../components/banner';
import Card from '../components/card';

import coffeeStoresData from '../data/coffee-stores.json';

import styles from '../styles/Home.module.scss';

export async function getStaticProps(context) {
  return {
    props: {
      coffeeStores: coffeeStoresData,
    }, // will be passed to the page component as props
  };
}

export default function Home({ coffeeStores }) {
  const bannerBtnHandleOnClick = () => {
    alert('hi from banner button...');
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
          buttonText="view stores nearby"
          handleOnClick={bannerBtnHandleOnClick}
        />

        <div className={styles.heroImage}>
          <Image
            src="/static/hero-image.png"
            alt="hero image"
            width={700}
            height={400}
          />
        </div>

        {coffeeStores.length > 0 && (
          <>
            <h2 className={styles.heading2}>Toronto stores</h2>
            <div className={styles.cardLayout}>
              {coffeeStores.map(
                ({ id, name, imgUrl, websiteUrl, ...otherProps }) => (
                  <Card
                    key={id}
                    className={styles.card}
                    name={name}
                    imgUrl={imgUrl}
                    href={`/coffee-store/${id}`}
                    {...otherProps}
                  />
                )
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
