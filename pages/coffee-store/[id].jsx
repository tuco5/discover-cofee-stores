import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import cls from 'classnames';

import coffeeStoresData from '../../data/coffee-stores.json';

import styles from '../../styles/coffee-store.module.scss';

export function getStaticProps({ params }) {
  return {
    props: {
      coffeeStore: coffeeStoresData.find(
        (coffeeStore) => coffeeStore.id === params.id
      ),
    },
  };
}

export function getStaticPaths() {
  const paths = coffeeStoresData.map(({ id }) => ({ params: { id } }));
  return {
    paths,
    fallback: true,
  };
}

const CoffeeStore = ({ coffeeStore }) => {
  const router = useRouter();

  if (router.isFallback) return <div>Loading..</div>;

  const { address, name, neighbourhood, imgUrl } = coffeeStore;

  const handleUpvoteButton = () => {
    alert('up vote button function goes here');
  };

  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link href="/">
              <a>Back to home</a>
            </Link>
          </div>
          <div className={styles.nameWrapper}>
            <h1 className={styles.name}>{name}</h1>
          </div>
          <Image
            src={imgUrl}
            width={600}
            height={360}
            alt={name}
            className={styles.storeImg}
          />
        </div>

        <div className={cls('glass', styles.col2)}>
          <div className={styles.iconWrapper}>
            <Image
              src="/icons/places.svg"
              width={24}
              height={24}
              alt="places icon"
            />
            <p className={styles.text}>{address}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image
              src="/icons/nearMe.svg"
              width={24}
              height={24}
              alt="near me icon"
            />
            <p className={styles.text}>{neighbourhood}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image
              src="/icons/star.svg"
              width={24}
              height={24}
              alt="star icon"
            />
            <p className={styles.text}>1</p>
          </div>
          <button className={styles.upvoteButton} onClick={handleUpvoteButton}>
            Up vote!
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoffeeStore;
