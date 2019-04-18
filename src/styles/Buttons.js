import styled from 'styled-components';
import { colors } from './theme.js';

export const Button = styled.button`
  background-color: #b8d9f0; /* Green */
  border: none;
  width: 268px;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border: solid 1px #48484841;
  border-radius: 4px;
  position: relative;
  // &.loading::after {
  //   content: url(/load.svg);
  //   position: absolute;
  //   right: 0;
  //   height: 10%;
  // }
`;
