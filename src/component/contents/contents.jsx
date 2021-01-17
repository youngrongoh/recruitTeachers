import React, { useState } from 'react';
import styles from './contents.module.css';
import TextContent from '../text_content/text_content';
import InputContent from '../input_content/input_content';

const Contents = ({ type, script, showNextPage, collectData }) => {
  const [name, setName] = useState(null);
  const handleNameSubmit = (value) => {
    setName(value);
  };

  const bg = script.bg === 'white' ? styles.white : styles.church;

  return (
    <section className={`${styles.content} ${bg}`}>
      <div className={styles.scene}>
        <img
          className={`${styles.avartar} ${
            script.avartar === ''
              ? styles.hide
              : script.avartar.match('rain')
              ? styles.rain
              : styles.kcm
          }`}
          src={`./assets/${script.avartar}.png`}
          alt="avartar"
        />
        <div
          className={`${styles.memewrap} ${
            script.meme === '' ? styles.hide : ''
          }`}
        >
          <img
            className={styles.meme}
            src={`./assets/${script.meme}`}
            alt="meme"
          />
        </div>
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
