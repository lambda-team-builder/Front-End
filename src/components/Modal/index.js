import React, { useRef } from "react";
import styled, { keyframes } from "styled-components";
import { colors } from "styles";

const Modal = ({ handleClose, children, width, ...props }) => {
  const modalRef = useRef();
  const handleClick = event => {
    event.target === modalRef.current && handleClose();
  };
  return (
    <BackgroundDiv onClick={handleClick} ref={modalRef}>
      <ModalDiv width={width}>
        <Close onClick={handleClose}>&times;</Close>
        <ModalContent>{children}</ModalContent>
      </ModalDiv>
    </BackgroundDiv>
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

const BackgroundDiv = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  background: #1a1a1a66;
  display: flex;
  // align-items: flex-start;
  // justify-content: center;
  animation: ${fadein} 0.3s;
  z-index: 10;
  overflow-y: auto;
`;

const ModalDiv = styled.div`
  margin: auto;
  position: relative;
  background: ${colors.turbulence};
  width: ${props => props.width || "auto"};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 10;
  border-radius: 4px;
  padding: 20px;
  box-sizing: border-box;
`;

const ModalContent = styled.div`
  width: 100%;
`;

const Close = styled.div`
  position: absolute;
  right: 5px;
  top: -5px;
  font-size: 1.8rem;
  color: ${colors.thunderhead};
  transition: color 0.3s;
  cursor: pointer;
  &:hover {
    color: ${colors.storm};
  }
`;

export default Modal;
