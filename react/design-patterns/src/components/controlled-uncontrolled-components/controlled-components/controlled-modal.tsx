import { useState } from 'react';
import { styled } from 'styled-components';

type Modal = {
  children: React.ReactElement;
  shouldDisplay: boolean;
  onClose: () => void;
};

const ModalBackground = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  background-color: #00000070;
  width: 100%;
  height: 100%;
`;

const ModalContent = styled.div`
  margin: 12% auto;
  padding: 24px;
  background-color: wheat;
  width: 50%;
  height: 50%;
  overflow: scroll;
`;

export default function ControlledModal(props: Modal) {
  const { children, shouldDisplay, onClose } = props;

  function propagationHandler(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
  }

  return (
    <>
      {shouldDisplay && (
        <ModalBackground onClick={onClose}>
          <ModalContent onClick={propagationHandler}>
            <button onClick={onClose}>Hide Modal</button>

            {children}
          </ModalContent>
        </ModalBackground>
      )}
    </>
  );
}
