import Link from 'next/link';
import Image from 'next/image';
import cls from 'classnames';

import styles from './card.module.scss';

const Card = ({ name, imgUrl, href }) => (
  <Link href={href}>
    <a className={styles.cardLink}>
      <div className={cls('glass', styles.container)}>
        <div className={styles.cardHeaderWrapper}>
          <h2 className={styles.cardHeader}>{name}</h2>
        </div>
        <div className={styles.cardImageWrapper}>
          <Image
            className={styles.cardImage}
            src={imgUrl}
            alt={name}
            width={260}
            height={160}
          />
        </div>
      </div>
    </a>
  </Link>
);

export default Card;
