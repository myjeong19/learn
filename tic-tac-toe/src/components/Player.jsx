import { useState } from 'react';
import classes from './css/Player.module.css';

export const Player = ({ initalName, symbol, isActive, onChangeName }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(initalName);

  const handleIsEditing = () => {
    setIsEditing(editingState => !editingState);
    if (isEditing) {
      onChangeName(symbol, playerName);
    }
  };
  const handleUserName = e => setPlayerName(e.target.value);

  let elementplayerName = <span className='player-name'> {playerName}</span>;
  let buttonCaption = 'Edit';

  if (isEditing) {
    elementplayerName = (
      <input
        type='text'
        required
        defaultValue={playerName}
        onChange={handleUserName}
      />
    );
    buttonCaption = 'Save';
  }

  return (
    <li className={isActive ? 'active' : null}>
      <span className={classes.player}>
        {elementplayerName}
        <span className={classes['player-symbol']}>{symbol}</span>
      </span>
      <button onClick={handleIsEditing}>{buttonCaption}</button>
    </li>
  );
};
