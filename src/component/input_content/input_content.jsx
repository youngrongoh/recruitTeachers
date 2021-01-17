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
    e.preventDefault();
    const target = e.target;
    const value = target.value;
    if (target.type === 'date') {
      e.target.value = value;
      return;
    }
    const pattern =
      target.type === 'text' ? /[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g : /[^0-9]/g;
    e.target.value = value.replace(pattern, '');
  };

  const onInputBtnClick = () => {
    const target = inputRef.current;
    const value = target.value;

    if (value === '') {
      alert(
        `${
          target.name === 'name'
            ? '당신의 이름을 입력하세요.'
            : '에이~ 번호 좀 알려줘~'
        }`
      );
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
      message = `당신의 실명이 ${value} 맞습니까?`;
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
    let target = e.target;
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

  const onKeyPress = (e) => {
    if (e.key === 'Enter' && inputRef.current) {
      onInputBtnClick();
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.value =
        inputRef.current.type === 'date' ? '2002-01-01' : '';
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
              className={`${styles.input} ${styles.birth}`}
              id="birth"
              type="date"
              name="birth"
              min="2002-01-01"
              max="2003-02-28"
              onChange={onChange}
              onKeyPress={onKeyPress}
            />
          )}
          {type[1] === 'name' && (
            <input
              ref={inputRef}
              className={`${styles.input} ${styles.name}`}
              id="name"
              type="text"
              name="name"
              placeholder="이름입력"
              pattern="[가-힣]+"
              maxLength="4"
              onChange={onChange}
              onKeyPress={onKeyPress}
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
              placeholder="연락처 8자리입력"
              onChange={onChange}
              onKeyPress={onKeyPress}
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
                      onKeyPress={onKeyPress}
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
