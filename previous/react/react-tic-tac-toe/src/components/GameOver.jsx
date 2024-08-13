import classes from './css/GameOver.module.css';

export const GameOver = ({ winner, onRestart }) => {
  return (
    <div className={classes['game-over']}>
      <h2>Game Over!</h2>
      {winner && <p>{winner} won!</p>}
      {!winner && <p>It&apos;s a draw!</p>}
      <p>
        <button onClick={onRestart}>Rematch!</button>
      </p>
    </div>
  );
};
