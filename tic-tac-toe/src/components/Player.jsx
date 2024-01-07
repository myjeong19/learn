import { useState } from 'react';

export const Player = ({ name, symbol }) => {
  const [isEditing, setIsEditing] = useState(false);
  const handleIsEditing = () => setIsEditing(!isEditing);

  let playName = <span className='player-name'> {name}</span>;

  if (isEditing) {
    playName = <input type='text' required />;
  }

  return (
    <li>
      <span className='player'>
        {playName}
        <span className='player-symbol'>{symbol}</span>
      </span>
      <button onClick={handleIsEditing}>{isEditing ? 'Save' : 'Edit'}</button>
    </li>
  );
};
