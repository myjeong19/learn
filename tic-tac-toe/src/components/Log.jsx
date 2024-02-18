export const Log = ({ turns }) => {
  const elementLog = turns.map(turn => (
    <li key={`${turn.square.row}${turn.square.column}`}>
      {turn.player} selected {turn.square.row}, {turn.square.column}
    </li>
  ));

  return <ol id='log'>{elementLog}</ol>;
};
