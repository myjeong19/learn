import { useState } from 'react';

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
      <span className='player'>
        {elementplayerName}
        <span className='player-symbol'>{symbol}</span>
      </span>
      <button onClick={handleIsEditing}>{buttonCaption}</button>
    </li>
  );
};
