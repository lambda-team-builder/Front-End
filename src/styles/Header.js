import styled from 'styled-components';
import { colors } from './theme.js';

export const Header = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background: ${colors.forest};
  padding: 0 15px;
  border-bottom: 2px solid ${colors.thunderhead};
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 10px;
`;
