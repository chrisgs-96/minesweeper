import Cell from './Cell';
import React, { useState, useEffect } from 'react';
import Row from './Row';
import GameMenu from './GameMenu';


function Minesweeper(props) {

  const [dashboard, setDashboard] = useState(undefined);
  // if hasLost = true then the user can't click on the board.
  const [hasLost, setHasLost] = useState(false);
  const [difficulty, setDifficulty] = useState('EASY'); // NORMAL, HARD
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [mines, setMines] = useState(0);
  useEffect(() => {
      const params = {
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
      setWidth(params[difficulty].width || 9);
      setHeight(params[difficulty].height || 9);
      setMines(params[difficulty].mines || 10);
  }, [difficulty])
  // Generates a random number belonging in [0,limit]
  const rng = (limit) => {
    return Math.ceil(Math.random() * (limit + 1)) - 1;
  }

  // Creates an empty [x,y] array and fills it up with the number 0 on each cell
  const createEmptyDashboard = () => {
    let arr = new Array(height);
    for (let i = 0; i < height; i += 1) {
      arr[i] = new Array(width);
      arr[i].fill(0, 0, width);
    }
    return arr;
  }

  // Takes a [x,y] array and fills it with mine objects.
  const fillWithMines = arr => {
    let remainingMines = mines || 10;
    while (remainingMines > 0) {
      let randomY = rng(height - 1);
      let randomX = rng(width - 1);
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
      alert('You lost!!!');
    }
    setDashboard([...arr]);
  }

  const initializeBoard = () => {
    let arr = createEmptyDashboard();
    fillWithMines(arr);
    addVisibilityParamsToArray(arr);
    setDashboard([...arr]);
    setHasLost(false);
  }

  useEffect(() => {
    if (width !== 0 && height !== 0 && mines !== 0) {
      initializeBoard();
    }
  }, [width, height, mines]);

  return (
    <div className={"minesweeper-outer-window" + (hasLost ? ' has-lost ' : '')}>
      <GameMenu
        setDifficulty={setDifficulty}
        initializeBoard={initializeBoard}
      />
      {dashboard && dashboard.map((row, i) => {
        return <Row reveal={reveal} cells={row} i={i} />
      })}
    </div>
  );
}

export default Minesweeper;
