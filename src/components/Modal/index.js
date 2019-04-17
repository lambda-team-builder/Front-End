import React, { useRef } from 'react';
import styled, { keyframes } from 'styled-components';

const Modal = ({handleClose, children, ...props}) => {
  const modalRef = useRef();
  const handleClick = event => {
    event.target === modalRef.current && handleClose();
  };
  return (
    <ModalDiv onClick={handleClick} ref={modalRef}>
      {children}
    </ModalDiv>
  );
};

const fadein = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1.0;
  }
`;

const ModalDiv = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: #1a1a1a66;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: ${fadein} 0.3s;
  z-index: 10;
`;

export default Modal;
