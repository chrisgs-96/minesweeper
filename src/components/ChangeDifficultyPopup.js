import React, { useEffect, useState } from 'react';
import CheckedButton from '../img/radio-button-checked.svg';
import UncheckedButton from '../img/radio-button-unchecked.svg';


function ChangeDifficultyPopup(props) {

  const {
    setDifficulty,
    // setCustomDifficulty,
    setIsPopupVisible,
  } = props;

  const [selectedOption, setSelectedOption] = useState(undefined);
  // const [customWidth, setCustomWidth] = useState(0);
  // const [customMines, setCustomMines] = useState(0);
  // const [customHeight, setCustomHeight] = useState(0);

  const changeDifficulty = () => {
    // if (selectedOption !== 'CUSTOM') {
      setDifficulty(selectedOption)
    // } else {
    //   if(customWidth <= 0) {
    //     alert('Width cant be 4 or less');
    //     return;
    //   }
    //   if(customHeight <= 0) {
    //     alert('Height cant be 4 or less')
    //     return;
    //   }
    //   if(customMines === 0 || customMines >= customWidth * customHeight) {
    //     alert('Mines cant be 0 or more than the total cells');
    //     return;
    //   }
    //   setCustomDifficulty(customWidth, customHeight, customMines)
    // }
    setIsPopupVisible(false)
  }

  const cancel = () => {
    setSelectedOption('');
    setIsPopupVisible(false);
  }

  // useEffect(() => {
  //   if (selectedOption === 'CUSTOM') {
  //     setCustomWidth(0);
  //     setCustomMines(0);
  //     setCustomHeight(0);
  //   }
  // }, [selectedOption])

  return (
    <div className="modal-background">
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
        {/* <div className="mini-flex" onClick={() => setSelectedOption('CUSTOM')}>
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
        </>} */}
        <div className="buttons-container">
          <button onClick={changeDifficulty}>Submit</button>
          <button onClick={cancel}> Cancel</button>
        </div>
      </div>
    </div >
  );
}

export default ChangeDifficultyPopup;
