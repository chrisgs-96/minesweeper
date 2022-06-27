import WhiteBomb from '../img/bomb-white.svg';
import Flag from '../img/flag.svg';

function Cell(props) {
  const { cell, i, j, reveal, toggleFlag } = props;
  const { isVisible, isBomb, isFlagged, value } = cell;
  return (
    <div className="minesweeper-cell" onClick={() => reveal(i, j)} onContextMenu={(e) => {
      e.preventDefault();
      toggleFlag(i,j)
    }}>
      {(isVisible && isBomb && !isFlagged) && <img src={WhiteBomb} />}
      {(isVisible && !isBomb && !isFlagged) && <span>{value}</span>}
      {isFlagged && <img src={Flag} />}
    </div>
  );
}

export default Cell;
