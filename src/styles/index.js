import styled from 'styled-components';
import { ReactComponent as SpinnerSVG } from './Spinner.svg';
import { colors } from './theme.js';
import { Card, AuthCard } from './Cards.js';
import { Button, ButtonSmall, ButtonSmallSubtle  } from './Buttons.js';
import { SubtleInput, SubtleTextarea } from './Input.js';

export { colors };
export { Card, AuthCard };
export { Button, ButtonSmall, ButtonSmallSubtle };
export { SubtleInput, SubtleTextarea };

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
