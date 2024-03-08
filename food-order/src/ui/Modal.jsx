import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export const Modal = ({ children, open, onClose, className = '' }) => {
  const dialog = useRef();

  useEffect(() => {
    const modal = dialog.current;
    if (open) {
      modal.showModal();
    }
    return () => modal.close();
    // clenaup function is of course run latter run the effect
  }, [open]);

  return createPortal(
    <dialog ref={dialog} className={`modal ${className}`} onClose={onClose}>
      {children}
    </dialog>,
    document.getElementById('modal')
  );
};
