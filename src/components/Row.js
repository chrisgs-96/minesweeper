import Cell from "./Cell";

function Row(props) {
  const { cells, i, reveal, toggleFlag } = props;
  return (
    <div className="minesweeper-row">
      {cells.map((cell, j) => (<Cell toggleFlag={toggleFlag} reveal={reveal} i={i} j={j} cell={cell} />))}
    </div>
  );
}

export default Row;
