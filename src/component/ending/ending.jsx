import React from 'react';
import styles from './ending.module.css';
import LogoTitle from '../logo_title/logo_title';

const Ending = (props) => (
  <>
    <div className={styles.logobox}>
      <LogoTitle />
      <p className={styles.text}>고등부에서 만나요😆</p>
      <p className={styles.text}>See You!</p>
    </div>
  </>
);

export default Ending;
