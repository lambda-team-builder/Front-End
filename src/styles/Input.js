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

export const BasicInput = styled.input`
  color: #1a1a1a;
  font-size: 1rem;
  border: none;
  outline: none;
  text-align: center;
  height: 40px;
  width: 268px;
  margin: 5px 0;
  border: solid 1px #48484841;
  border-radius: 4px;
  transition: border-color 0.3s;
  &:hover {
    border-color: ${colors.thunderhead};
  }
  &:focus {
    border-color: ${colors.antimatter};
  }
`;

export const BasicTextarea = styled.textarea`
  color: #1a1a1a;
  font-size: 1rem;
  border: none;
  outline: none;
  width: 100%;
  margin: 5px 0;
  border: solid 1px #48484841;
  border-radius: 4px;
  transition: border-color 0.3s;
  padding: 5px;
  max-width: 400px;
  &:hover {
    border-color: ${colors.thunderhead};
  }
  &:focus {
    border-color: ${colors.antimatter};
  }
`;

export const BasicForm = styled.form`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
width: 100%;
* {
  margin-bottom: 20px;
}
`;
