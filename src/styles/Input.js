import styled from 'styled-components';
import { colors } from './theme.js';

export const SubtleInput = styled.input`
  background: transparent;
  border: 2px solid transparent;
  border-radius: 2px;
  transition: border-color 0.3s, background 0.3s;
  width: 80%;
  font-size: 1.3rem;
  font-weight: bold;
  padding: 5px;
  box-sizing: border-box;
  &:hover {
    border-color: ${colors.thunderhead};
    background: ${colors.cloud};
  }
  &:focus {
    border-color: ${colors.antimatter};
    background: ${colors.cloud};
  }
`;

export const SubtleTextarea = styled.textarea`
  background: transparent;
  border: 2px solid transparent;
  border-radius: 2px;
  transition: border-color 0.3s, background 0.3s;
  width: 100%;
  height: 150px;
  font-size: 1.0rem;
  padding: 5px;
  box-sizing: border-box;
  resize: none;
  display: block;
  &:hover {
    border-color: ${colors.thunderhead};
    background: ${colors.cloud};
  }
  &:focus {
    border-color: ${colors.antimatter};
    background: ${colors.cloud};
  }
`;
