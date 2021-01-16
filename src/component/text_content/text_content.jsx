import React, { useState } from 'react';
import styles from './text_content.module.css';

const TextContent = ({ script, showNextPage, name }) => {
  const [texts, setTexts] = useState(script.texts[0]);
  let id = 0;

  const renderText = (text) => {
    const replaced = text.replace('[name]', name);
    return (
      <p key={id++} className={styles.text}>
        {replaced}
      </p>
    );
  };

  const onClick = () => {
    const currIdx = script.texts.findIndex((item) => item === texts);
    if (currIdx < script.texts.length - 1) {
      setTexts(script.texts[currIdx + 1]);
    } else {
      showNextPage();
    }
  };

  return (
    <div className={styles.textbox} onClick={onClick}>
      <span className={styles.name}>{script.speaker}</span>
      <div className={styles.texts}>{texts.map(renderText)}</div>
    </div>
  );
};

export default TextContent;
