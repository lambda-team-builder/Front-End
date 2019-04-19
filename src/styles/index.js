import styled from "styled-components";
import { ReactComponent as SpinnerSVG } from "./Spinner.svg";
import { colors } from "./theme.js";
import { Card, AuthCard } from "./Cards.js";
import {
  Button,
  ButtonSmall,
  ButtonSmallSubtle,
  LandingButton
} from "./Buttons.js";
import {
  SubtleInput,
  SubtleTextarea,
  BasicInput,
  BasicForm,
  BasicTextarea
} from "./Input.js";
import { Header } from "./Header.js";

export { colors };
export { Card, AuthCard };
export { Button, ButtonSmall, ButtonSmallSubtle, LandingButton };
export { SubtleInput, SubtleTextarea, BasicInput, BasicForm, BasicTextarea };
export { Header };

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
  path {
    fill: white;
  }
`;

export const TopDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: top;
  align-items: center;
  min-height: 100vh;
`;
