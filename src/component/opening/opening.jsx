import React, { useRef, useState } from 'react';
import LogoTitle from '../logo_title/logo_title';
import styles from './opening.module.css';

const Opening = ({ changeGameState }) => {
  const [playState, setPlayState] = useState(false);
  const videoRef = useRef();

  const onClick = () => {
    if (!playState) {
      setPlayState(true);
      videoRef.current.play();
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if (videoRef.current.webkitRequestFullscreen) {
        videoRef.current.webkitRequestFullscreen();
      } else if (videoRef.current.msRequestFullscreen) {
        videoRef.current.msRequestFullscreen();
      }
    }
  };

  const onEnded = () => {
    if (videoRef.current.exitFullscreen) {
      videoRef.current.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (videoRef.current.msExitFullscreen) {
      videoRef.current.msExitFullscreen();
    }
    videoRef.current.currentTime = videoRef.current.duration;
    changeGameState();
  };

  return (
    <section className={styles.opening} onClick={onClick}>
      <div className={styles.logobox}>
        <LogoTitle />
        <p className={styles.start}>화면을 터치하세요</p>
      </div>
      <video
        ref={videoRef}
        className={styles.video}
        muted
        allowFullScreen
        onEnded={onEnded}
        onPause={onEnded}
      >
        <source src="./assets/switch-To-me.mov" type="video/mp4" />
        <source src="./assets/switch-To-me.webm" type="video/webm" />
        <source src="./assets/switch-To-me.mp4" type="video/webm" />
      </video>
    </section>
  );
};

export default Opening;
