import styled from 'styled-components';
import { colors } from './theme.js';

// export const Button = styled.button`
//   background-color: #b8d9f0; /* Green */
//   border: none;
//   width: 268px;
//   color: white;
//   padding: 15px 32px;
//   text-align: center;
//   text-decoration: none;
//   display: inline-block;
//   font-size: 16px;
//   border: solid 1px #48484841;
//   border-radius: 4px;
//   position: relative;
//   // &.loading::after {
//   //   content: url(/load.svg);
//   //   position: absolute;
//   //   right: 0;
//   //   height: 10%;
//   // }
// `;

export const Button = styled.div.attrs(({bg, fg, shadow, ...props}) => ({
  ...props,
  bg: bg || colors.forest,
  fg: fg || colors.white,
  shadow: shadow || colors.dusk,
}))`
  background: ${props => props.bg};
  color: ${props => props.fg};
  border: none;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  font-weight: bold;
  font-size: 1.2rem;
  border-radius: 4px;
  cursor: pointer;
  transition: box-shadow 0.3s;
  position: relative;
  &:hover {
    box-shadow: 0 0 10px ${props => props.shadow} inset;
  }
`;

export const ButtonSmall = styled(Button)`
  padding: 6px 10px;
  font-size: 1.0rem;
  display: inline-block;
`;

export const ButtonSmallSubtle = styled(ButtonSmall)`
background: transparent;
color: ${colors.thunderhead}
transition: background 0.2s, color 0.2s;
font-weight: normal;
&:hover {
  background: ${props => props.bg};
  color: ${props => props.fg};
  box-shadow: none;
}
`;
