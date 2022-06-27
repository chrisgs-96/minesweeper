import WhiteBomb from '../img/bomb-white.svg';

function Cell(props) {
  const { cell, i, j, reveal } = props;
  const { isVisible, isBomb, value } = cell;
  return (
    <div className="minesweeper-cell" onClick={() => reveal(i, j)}>
      {(isVisible && isBomb) && <img src={WhiteBomb} />}
      {(isVisible && !isBomb) && <span>{value}</span>}
    </div>
  );
}

export default Cell;
