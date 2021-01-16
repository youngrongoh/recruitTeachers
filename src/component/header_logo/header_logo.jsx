import React from 'react';
import styles from './header_logo.module.css';

const HeaderLogo = (props) => (
  <header className={styles.titlebox}>
    <h1 className={styles.title}>
      <small className={styles.small}>(청년교사 모집)</small>
      <strong className={styles.season}>시즌</strong>
      <span className={styles.nonseason}>비시즌</span>
    </h1>
  </header>
);

export default HeaderLogo;
