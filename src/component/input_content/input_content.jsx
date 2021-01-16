import React, { useEffect, useRef } from 'react';
import styles from './input_content.module.css';

const InputContent = ({
  type,
  script,
  showNextPage,
  handleNameSubmit,
  collectData,
}) => {
  const inputRef = useRef();
  const buttonRef = useRef();

  let id = 0;

  const onButtonMouseOver = () => {
    inputRef.current.classList.add(styles.hover);
  };

  const onButtonMouseLeave = () => {
    inputRef.current.classList.remove(styles.hover);
  };

  const onChange = (e) => {
    e.preventDefault(e);
  };

  const onInputBtnClick = () => {
    const target = inputRef.current;
    const value = target.value;

    if (value === '') {
      alert(`에이~ ${target.name === 'name' ? '이름' : '번호'} 좀 알려줘~`);
      return;
    }

    let message = '';

    if (target.name === 'birth') {
      const dateArr = value.split('-');
      const formatted = dateArr.map(
        (str, idx) => str + ['년', '월', '일'][idx]
      );
      message = `네 생일이 ${formatted.join(' ')} 맞아?`;
    } else if (target.name === 'name') {
      handleNameSubmit(value.slice(-2));
      message = `네 이름이 ${value} 맞아?`;
    } else if (target.name === 'phone') {
      if (value.length < 8) {
        alert('응? 번호가 이상한데?');
        return;
      }
      const forward = value.slice(0, 4);
      const formatted = value.replace(forward, forward + '-');
      message = `네 번호가 010-${formatted} 맞아?`;
    }

    collectData(value);
    const confirm = window.confirm(message);
    confirm && showNextPage();
  };

  const onSelectBtnClick = (e) => {
    const target = e.target;
    if (target.matches('button') && target.firstElementChild) {
      const value = target.firstElementChild.value;
      return value.length < 8
        ? alert('응? 번호가 이상한데?')
        : alert('응 아니야~ 섭섭하다 섭섭해~');
    } else if (target.matches('button input')) {
      return;
    }
    showNextPage();
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className={styles.inputbox}>
      <div className={styles.question}>
        {script.texts[0].map((text) => (
          <p key={id++} className={styles.text}>
            {text}
          </p>
        ))}
      </div>

      {type[1] !== 'select' && (
        <div className={styles.inputwrap}>
          {type[1] === 'birth' && (
            <input
              ref={inputRef}
              className={styles.input}
              id="birth"
              type="date"
              name="birth"
              value="2002-01-01"
              min="2002-01-01"
              max="2003-02-28"
              onChange={onChange}
            />
          )}
          {type[1] === 'name' && (
            <input
              ref={inputRef}
              className={`${styles.input} ${styles.name}`}
              id="name"
              type="text"
              name="name"
              placeholder="이름 입력"
              pattern="[가-힣]+"
              maxLength="4"
              onChange={onChange}
            />
          )}
          {type[1] === 'phone' && (
            <input
              ref={inputRef}
              className={`${styles.input} ${styles.phone}`}
              id="phone"
              type="tel"
              name="phone"
              pattern="[0-9]+"
              maxLength="8"
              onChange={onChange}
              placeholder="번호 8자리 입력"
            />
          )}
          <button
            ref={buttonRef}
            className={styles.button}
            onClick={onInputBtnClick}
            onMouseOver={onButtonMouseOver}
            onMouseLeave={onButtonMouseLeave}
          >
            확인
          </button>
        </div>
      )}
      {type[1] === 'select' && (
        <div className={styles.selectbox}>
          {script.texts[1].map((text) => {
            const strArr = text.split('[number]');
            return (
              <button
                key={id++}
                className={styles.select}
                onClick={onSelectBtnClick}
              >
                {text.match('[number]') ? (
                  <>
                    <>{strArr[0]}</>
                    <input
                      className={`${styles.input} ${styles.inline}`}
                      type="tel"
                      placeholder="번호 입력"
                      pattern="[0-9]+"
                      maxLength="8"
                    ></input>
                    <>{strArr[1]}</>
                  </>
                ) : (
                  text
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default InputContent;
