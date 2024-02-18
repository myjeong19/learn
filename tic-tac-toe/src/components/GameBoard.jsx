export const GameBoard = ({ onSelectSquare, board }) => {
  const elementGameBoard = board.map((row, rowIndex) => (
    <li key={rowIndex}>
      <ol>
        {row.map((playerSymbol, columnIndex) => (
          <li key={columnIndex}>
            <button
              onClick={() => onSelectSquare(rowIndex, columnIndex)}
              disabled={!!playerSymbol}
            >
              {playerSymbol}
            </button>
          </li>
        ))}
      </ol>
    </li>
  ));

  return <ol id='game-board'>{elementGameBoard}</ol>;
};
