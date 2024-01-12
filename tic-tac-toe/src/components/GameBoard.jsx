import { useState } from 'react';

const initalGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export const GameBoard = ({ onSelectSquare, activePlayerSymbol }) => {
  const [gameBoard, setGameBoard] = useState(initalGameBoard);

  const handleSelectSquare = (rowIndex, colIndex) => {
    setGameBoard(prevGameBoard => {
      const updatedBoard = [
        ...prevGameBoard.map(innerArray => [...innerArray]),
      ];
      updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
      return updatedBoard;
    });

    onSelectSquare();
  };

  const elementGameBoard = gameBoard.map((row, rowIndex) => (
    <li key={rowIndex}>
      <ol>
        {row.map((playerSymbol, columnIndex) => (
          <button
            key={columnIndex}
            onClick={() => handleSelectSquare(rowIndex, columnIndex)}
          >
            {playerSymbol}
          </button>
        ))}
      </ol>
    </li>
  ));

  return <ol id='game-board'>{elementGameBoard}</ol>;
};
