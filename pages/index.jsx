import Head from 'next/head';

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
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <Banner
          buttonText='view stores nearby'
          handleOnClick={bannerBtnHandleOnClick}
        />
      </main>
    </div>
  );
}
