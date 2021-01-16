import React, { useState } from 'react';
import styles from './contents.module.css';
import TextContent from '../text_content/text_content';
import InputContent from '../input_content/input_content';

const Contents = ({ type, script, showNextPage, collectData }) => {
  const [name, setName] = useState(null);
  const handleNameSubmit = (value) => {
    setName(value);
  };

  return (
    <section className={styles.content}>
      <div className={styles.scene}>
        <img
          className={`${styles.avartar} ${
            script.avartar.match('rain') ? styles.rain : styles.kcm
          }`}
          src={`./assets/${script.avartar}.png`}
          alt="rain"
        />
      </div>
      {type[0] === 'text' && (
        <TextContent
          key={new Date()}
          script={script}
          showNextPage={showNextPage}
          name={name}
        />
      )}
      {type[0] === 'input' && (
        <InputContent
          type={type}
          script={script}
          showNextPage={showNextPage}
          handleNameSubmit={handleNameSubmit}
          collectData={collectData}
        />
      )}
    </section>
  );
};

export default Contents;
