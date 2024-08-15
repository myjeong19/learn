import { useState } from 'react';
import { styled } from 'styled-components';

type Modal = {
  children: React.ReactElement;
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

export default function Modal(props: Modal) {
  const { children } = props;

  const [isShow, setIsShow] = useState<boolean>(false);

  function modalHandler() {
    setIsShow(prev => !prev);
  }

  function propagationHandler(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
  }

  return (
    <>
      <button onClick={modalHandler}>Show Modal</button>
      {isShow && (
        <ModalBackground onClick={modalHandler}>
          <ModalContent onClick={propagationHandler}>
            <button onClick={modalHandler}>Hide Modal</button>

            {children}
          </ModalContent>
        </ModalBackground>
      )}
    </>
  );
}
