import React from 'react';
import styles from './logo_title.module.css';

const LogoTitle = (props) => (
  <div className={`${styles.logo}`} aria-label="play">
    <img
      className={`${styles.img} ${styles.back}`}
      src="./assets/switch-to-me-logo-back.png"
      alt="logo back"
    />
    <img
      className={`${styles.img} ${styles.front}`}
      src="./assets/switch-to-me-logo-front.png"
      alt="logo front"
    />
  </div>
);

export default LogoTitle;
