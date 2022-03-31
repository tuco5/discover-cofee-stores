import Head from 'next/head';
import Image from 'next/image';

import Banner from '../components/banner';

import styles from '../styles/Home.module.scss';

export default function Home() {
  const bannerBtnHandleOnClick = () => {
    alert('hi from banner button...');
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Coffee Conoisseur</title>
        <meta
          name='description'
          content='Coffee stores finder near by me landing page.'
        />
      </Head>

      <main className={styles.main}>
        <Banner
          buttonText='view stores nearby'
          handleOnClick={bannerBtnHandleOnClick}
        />
        <div className={styles.heroImage}>
          <Image
            src='/static/hero-image.png'
            alt='hero image'
            width={700}
            height={400}
          />
        </div>
      </main>
    </div>
  );
}
