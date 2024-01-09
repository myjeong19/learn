const initalGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export const GameBoard = () => {
  const elementGameBoard = initalGameBoard.map((row, rowIndex) => (
    <li key={rowIndex}>
      <ol>
        {row.map((playerSymbol, columnIndex) => (
          <button key={columnIndex}>{playerSymbol}</button>
        ))}
      </ol>
    </li>
  ));

  return <ol id='game-board'>{elementGameBoard}</ol>;
};
