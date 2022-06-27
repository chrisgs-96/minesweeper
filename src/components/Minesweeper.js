import Cell from './Cell';
import React, { useState, useEffect } from 'react';
import Row from './Row';
import GameMenu from './GameMenu';
import PopupMessage from './PopupMessage';


function Minesweeper(props) {

  const [dashboard, setDashboard] = useState(undefined);
  // if hasLost = true then the user can't click on the board.
  const [hasLost, setHasLost] = useState(false);
  const [width, setWidth] = useState(9);
  const [height, setHeight] = useState(9);
  const [mines, setMines] = useState(9);
  const [popupProps, setPopupProps] = useState({ isVisible: false, message: '' });
  const [gameProperties, setGameProperties] = useState({
    width: 9,
    height: 9,
    mines: 10,
  })

  const showPopup = msg => {
    setPopupProps({
      isVisible: true,
      message: msg,
    })
  }

  // Generates a random number belonging in [0,limit]
  const rng = (limit) => {
    return Math.ceil(Math.random() * (limit + 1)) - 1;
  }

  // Creates an empty [x,y] array and fills it up with the number 0 on each cell
  const createEmptyDashboard = () => {
    let arr = new Array(gameProperties.height);
    for (let i = 0; i < gameProperties.height; i += 1) {
      arr[i] = new Array(gameProperties.width);
      arr[i].fill(0, 0, gameProperties.width);
    }
    return arr;
  }

  // Takes a [x,y] array and fills it with mine objects.
  const fillWithMines = arr => {
    let remainingMines = gameProperties.mines || 10;
    while (remainingMines > 0) {
      let randomY = rng(gameProperties.height - 1);
      let randomX = rng(gameProperties.width - 1);
      arr[randomY][randomX] = -1;
      remainingMines--;
    }
    return arr;
  }

  // Converts the array from an array with integers into an array
  // that contains an object with the following format: 
  // {
  //    isVisible : true/false 
  //    value: (The number of neighbor bombs)
  //    isBomb: true/false
  // }
  const addVisibilityParamsToArray = arr => {
    for (let i = 0; i < arr.length; i += 1) {
      for (let j = 0; j < arr[i].length; j += 1) {
        arr[i][j] = {
          value: arr[i][j],
          isVisible: false,
          isBomb: arr[i][j] === -1,
          isFlagged: false,
        }
      }
    }
    return arr;
  }

  // Reveals the cell's value to the user, if the value is a bomb
  // then (for starters) an alert message is showing on the screen
  const reveal = (i, j) => {
    let arr = dashboard;
    if (!arr[i][j].isVisible) {
      arr[i][j].isVisible = true;
    }
    if (arr[i][j].isBomb) {
      setHasLost(true);
      for (let i = 0; i < arr.length; i += 1) {
        for (let j = 0; j < arr[i].length; j += 1) {
          arr[i][j].isVisible = true;
          if(arr[i][j].isFlagged && !arr[i][j].isBomb) {
            arr[i][j].isFlagged=false;
          }
        }
      }
      showPopup('You lost. Press restart to try again!');
    }
    setDashboard([...arr]);
  }

  const toggleFlag = (i, j) => {
    let arr = dashboard;
    if (arr[i][j].isVisible) {
      return;
    }
    arr[i][j].isFlagged = !arr[i][j].isFlagged;
    setDashboard([...arr]);
  }

  // calls the countNeighboringMines for every cell of the array
  const completeDashboard = (arr) => {
    for (let i = 0; i < arr.length; i += 1) {
      for (let j = 0; j < arr[i].length; j += 1) {
        if (!arr[i][j].isBomb) {
          countNeighboringMines(arr, i, j);
        }
      }
    }
  }

  // Checks the surrounding neighbors of the cell that is at [i,j] and counts how many of them are mines.
  const countNeighboringMines = (arr, y, x) => {
    let minesFound = 0;
    for (let i = -1; i <= +1; i += 1) {
      for (let j = -1; j <= 1; j += 1) {
        // we check to see if the neighbor that we're checking is inside the bounds
        // for example arr[-1,-1] is obviously an unallowed cell
        // or on a 5x5 array arr[7,7] is unallowed too!
        if (y + i >= 0 && x + j >= 0 && y + i < arr.length && x + j < arr[y].length) {
          if (arr[y + i][x + j].isBomb) {
            minesFound += 1;
          }
        }
      }
    }
    arr[y][x].value = minesFound;
    // return arr;
  };

  const initializeBoard = () => {
    let arr = createEmptyDashboard();
    fillWithMines(arr);
    addVisibilityParamsToArray(arr);
    completeDashboard(arr)
    setDashboard([...arr]);
    setHasLost(false);
  }

  useEffect(() => {
    initializeBoard();
  }, [gameProperties]);

  return (
    <>
      {popupProps.isVisible &&
        <PopupMessage
          popupProps={popupProps}
          setPopupProps={setPopupProps}
        />}
      <div className={"minesweeper-outer-window" + (hasLost ? ' has-lost ' : '')}>
        <GameMenu
          setGameProperties={setGameProperties}
          initializeBoard={initializeBoard}
          showPopup={showPopup}
        />
        {dashboard && dashboard.map((row, i) => {
          return <Row toggleFlag={toggleFlag} reveal={reveal} cells={row} i={i} />
        })}
      </div>
    </>
  );
}

export default Minesweeper;
