import styles from './banner.module.scss';

const Banner = ({ buttonText, handleOnClick }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <span className={styles.title1}>coffee </span>
        <span className={styles.title2}>connoisseur</span>
      </h1>
      <p className={styles.subTitle}>discover your local cofee shops!</p>
      <div className={styles.buttonWrapper}>
        <button className={styles.button} onClick={handleOnClick}>
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default Banner;
