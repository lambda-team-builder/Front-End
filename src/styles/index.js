import styled from 'styled-components';
import { colors } from './theme.js';
import { Card, AuthCard } from './Cards.js';
import { Button } from './Buttons.js';
import { ReactComponent as SpinnerSVG } from './Spinner.svg';

export { colors };
export { Card, AuthCard };
export { Button };

export const CenteredDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

export const Spinner = styled(SpinnerSVG)`
  position: absolute;
  right: 0;
  height: 50%;
`;
