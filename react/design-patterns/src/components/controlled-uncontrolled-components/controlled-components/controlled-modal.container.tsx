import { useState } from 'react';
import ControlledModal from './controlled-modal';

export default function ControlledModalContainer() {
  const [shouldDisplay, setShouldDisplay] = useState<boolean>(false);

  function closeModalHandler() {
    setShouldDisplay(false);
  }

  return (
    <>
      <ControlledModal shouldDisplay={shouldDisplay} onClose={closeModalHandler}>
        <h3>I am the body of the modal!!!</h3>
      </ControlledModal>
      <button onClick={() => setShouldDisplay(prev => !prev)}>
        {shouldDisplay ? 'Hide Modal' : 'Display Modal'}
      </button>
    </>
  );
}
