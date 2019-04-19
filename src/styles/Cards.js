import { colors } from './theme.js';
import styled from 'styled-components';

export const Card = styled.div.attrs(({bg, shadow, ...props}) => ({
  ...props,
  bg: bg || colors.turbulence,
  shadow: shadow || colors.thunderhead,
}))`
  padding: 20px;
  border-radius: 10px;
  background: ${props => props.bg};
  border: 1px solid ${props => props.shadow};
  color: ${colors.midnight};
  box-shadow: 0 2px 0 ${props => props.shadow};
  display: flex;
  flex-direction: column;
  align-items: center;
`;


export const AuthCard = styled(Card)`
  margin: 0 auto;
  width: 100%;
  max-width: 400px;
  height: 400px;
  display: flex;
  justify-content: center;
`;
