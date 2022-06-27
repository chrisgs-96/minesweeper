import React, { useEffect, useState } from 'react';
import CheckedButton from '../img/radio-button-checked.svg';
import UncheckedButton from '../img/radio-button-unchecked.svg';


function ChangeDifficultyPopup(props) {

  const {
    popupProps,
    setPopupProps
  } = props;

  const hideMessage = () => setPopupProps({ isVisible: false });

  return (
    <div className="modal-background more-zindex">
      <div className="invisible-modal-background more-zindex" onClick={hideMessage} />
      <div className="modal more-zindex">
        <span className="explanation">{popupProps?.message || '-'}</span>
        <div className="buttons-container centralize">
          <button onClick={hideMessage}>Okay</button>
        </div>
      </div>
    </div >
  );
}

export default ChangeDifficultyPopup;
