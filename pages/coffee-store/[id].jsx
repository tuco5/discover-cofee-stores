import { useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import cls from 'classnames';

import { fetchCoffeeStores } from '../../lib/coffee-stores';
import { isEmpty } from '../../utils';

import { StoreContext } from '../../context/store-context';

import styles from '../../styles/coffee-store.module.scss';

export async function getStaticProps({ params }) {
  const coffeeStores = await fetchCoffeeStores();
  const findCoffeeStoreById = coffeeStores.find(
    (coffeeStore) => coffeeStore.id === params.id
  );
  return {
    props: {
      coffeeStore: findCoffeeStoreById ? findCoffeeStoreById : {},
    },
  };
}

export async function getStaticPaths() {
  const coffeeStores = await fetchCoffeeStores();
  const paths = coffeeStores.map(({ id }) => ({ params: { id } }));
  return {
    paths,
    fallback: true,
  };
}

const CoffeeStore = (initialProps) => {
  const router = useRouter();
  const id = router.query.id;

  const [coffeeStore, setCoffeeStore] = useState(initialProps.coffeeStore);

  const {
    state: { coffeeStores },
  } = useContext(StoreContext);

  const createCoffeeStore = async (data) => {
    try {
      const response = await fetch('/api/coffeeStore', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const dbCoffeeStore = await response.json();
    } catch (err) {
      console.log('Error creating coffee store', err);
    }
  };

  useEffect(() => {
    if (isEmpty(initialProps.coffeeStore)) {
      if (coffeeStores.length > 0) {
        const findCoffeeStoreById = coffeeStores.find(
          (coffeeStore) => coffeeStore.id === id
        );
        setCoffeeStore(findCoffeeStoreById);
        createCoffeeStore(findCoffeeStoreById);
      }
    } else {
      createCoffeeStore(initialProps.coffeeStore);
    }
  }, [id, initialProps, coffeeStore, coffeeStores]);

  if (router.isFallback) return <div>Loading..</div>;

  const { address, name, neighborhood, imgUrl } = coffeeStore;

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
              <a>&larr; Back to home</a>
            </Link>
          </div>
          <div className={styles.nameWrapper}>
            <h1 className={styles.name}>{name}</h1>
          </div>
          <Image
            src={
              imgUrl ||
              'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80'
            }
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
          {neighborhood && ( // If neighborhood is  not empty will render.
            <div className={styles.iconWrapper}>
              <Image
                src="/icons/nearMe.svg"
                width={24}
                height={24}
                alt="near me icon"
              />
              <p className={styles.text}>{neighborhood}</p>
            </div>
          )}
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
