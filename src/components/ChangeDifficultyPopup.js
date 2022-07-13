import React, { useEffect, useState } from 'react';
import CheckedButton from '../img/radio-button-checked.svg';
import UncheckedButton from '../img/radio-button-unchecked.svg';


function ChangeDifficultyPopup(props) {

  const {
    setGameProperties,
    showPopup,
    setIsPopupVisible,
  } = props;

  const [selectedOption, setSelectedOption] = useState(undefined);
  const [customWidth, setCustomWidth] = useState(0);
  const [customMines, setCustomMines] = useState(0);
  const [customHeight, setCustomHeight] = useState(0);

  const gameSizeParams = {
    'EASY': {
      width: 9,
      height: 9,
      mines: 10
    },
    'NORMAL': {
      width: 16,
      height: 16,
      mines: 40,
    },
    'HARD':
    {
      width: 24,
      height: 24,
      mines: 99,
    }
  }

  const changeDifficulty = () => {
    if (selectedOption !== 'CUSTOM') {
      setGameProperties(gameSizeParams[selectedOption])
    } else {
      console.log('Better control on erors on change custom game mode')
      if (customWidth <= 0 || customHeight <= 0 || customMines === 0 || customMines >= customWidth * customHeight) {
        showPopup('Please what you\'ve written.\n* Width must be a positive number\n* Height must be a positive number\n* Mines must be less than width * height');
        return;
      }
      setGameProperties({
        width: parseInt(customWidth, 10),
        height: parseInt(customHeight, 10),
        mines: parseInt(customMines, 10),
      })
    }
    setIsPopupVisible(false)
  }

  const cancel = () => {
    setSelectedOption('');
    setIsPopupVisible(false);
  }

  return (
    <div className="modal-background" style={{ pointerEvents: 'auto' }}>
      <div className="invisible-modal-background" onClick={() => setIsPopupVisible(false)} />
      <div className="modal">
        <span className="explanation">Please select your desired difficulty: </span>
        <div className="mini-flex" onClick={() => setSelectedOption('EASY')}>
          <img src={selectedOption === 'EASY' ? CheckedButton : UncheckedButton} />
          <span>EASY</span>
        </div>
        <div className="mini-flex" onClick={() => setSelectedOption('NORMAL')}>
          <img src={selectedOption === 'NORMAL' ? CheckedButton : UncheckedButton} />
          <span>NORMAL</span>
        </div>
        <div className="mini-flex" onClick={() => setSelectedOption('HARD')}>
          <img src={selectedOption === 'HARD' ? CheckedButton : UncheckedButton} />
          <span>HARD</span>
        </div>
        <div className="mini-flex" onClick={() => setSelectedOption('CUSTOM')}>
          <img src={selectedOption === 'CUSTOM' ? CheckedButton : UncheckedButton} />
          <span>CUSTOM</span>
        </div>
        {selectedOption === 'CUSTOM' && <>
          <div className="mini-flex-2">
            <span>Width: </span>
            <input type="number" value={customWidth} onChange={e => setCustomWidth(e.target.value)} />
          </div>
          <div className="mini-flex-2">
            <span>Height: </span>
            <input type="number" value={customHeight} onChange={e => setCustomHeight(e.target.value)} />
          </div>
          <div className="mini-flex-2">
            <span>Mines: </span>
            <input type="number" value={customMines} onChange={e => setCustomMines(e.target.value)} />
          </div>
        </>}
        <div className="buttons-container">
          <button onClick={changeDifficulty}>Submit</button>
          <button onClick={cancel}> Cancel</button>
        </div>
      </div>
    </div >
  );
}

export default ChangeDifficultyPopup;
