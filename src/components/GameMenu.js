import { useState } from 'react';
import ChangeDifficultyPopup from './ChangeDifficultyPopup';

function GameMenu(props) {

  const { initializeBoard,
    setGameProperties,
    setCustomDifficulty,
    showPopup,
  } = props;
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  return (
    <>
      <div className="menu-bar-container">
        <span className="option" onClick={() => setIsPopupVisible(true)}>Change difficulty</span>
        <span className="option" onClick={initializeBoard}>Restart</span>
      </div>
      {isPopupVisible &&
        <ChangeDifficultyPopup
          showPopup={showPopup}
          setGameProperties={setGameProperties}
          setCustomDifficulty={setCustomDifficulty}
          setIsPopupVisible={setIsPopupVisible}
        />}
    </>
  );
}

export default GameMenu;
