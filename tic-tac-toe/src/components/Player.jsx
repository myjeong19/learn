import { useState } from 'react';

export const Player = ({ initialName, symbol }) => {
  const [playerName, setPlayerName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);

  const handleIsEditing = () => {
    setIsEditing(editing => !isEditing);
  };

  const handleChange = e => {
    setPlayerName(e.target.value);
  };

  let editablePlayName = <span className='player-name'> {playerName}</span>;

  if (isEditing) {
    editablePlayName = (
      <input
        type='text'
        required
        defaultValue={playerName}
        onChange={handleChange}
      />
    );
  }

  return (
    <li>
      <span className='player'>
        {editablePlayName}
        <span className='player-symbol'>{symbol}</span>
      </span>
      <button onClick={handleIsEditing}>{isEditing ? 'Save' : 'Edit'}</button>
    </li>
  );
};
