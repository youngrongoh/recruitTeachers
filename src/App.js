import { useState } from 'react';
import styles from './App.module.css';
import HeaderLogo from './component/header_logo/header_logo';
import Contents from './component/contents/contents';
import Opening from './component/opening/opening';
import context from './context.json';
import Ending from './component/ending/ending';
import Sheets from './service/sheets';

const { scripts } = context;
document.addEventListener('gesturestart', function (e) {
  e.preventDefault();
});

const sheets = new Sheets(new FormData());

function App() {
  const [type, setType] = useState([]);
  const [script, setScene] = useState(null);
  const [gameState, setGameState] = useState('open');

  const showNextPage = () => {
    const currIdx = scripts.findIndex((item) => item === script);
    if (currIdx < scripts.length - 1) {
      const nextScript = scripts[currIdx + 1];
      setScene(nextScript);
      setType(nextScript.type);
    } else {
      changeGameState();
    }
  };

  const showFirstPage = () => {
    if (!script) {
      const initial = scripts[0];
      setScene(initial);
      setType(initial.type);
      return;
    }
  };

  const changeGameState = () => {
    if (gameState === 'open') {
      setGameState('play');
    } else {
      setGameState('end');
    }
  };

  return (
    <div className={styles.app} onClick={showFirstPage}>
      {gameState === 'open' && <Opening changeGameState={changeGameState} />}
      {gameState === 'play' && (
        <>
          <HeaderLogo />
          <main className={styles.contentbox}>
            <Contents
              type={type}
              script={script}
              showNextPage={showNextPage}
              collectData={sheets.collectData}
            />
          </main>
        </>
      )}
      {gameState === 'end' && <Ending />}
    </div>
  );
}

export default App;
