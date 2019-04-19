import React from 'react';
import { Spinner, CenteredDiv } from 'styles';
import styled from 'styled-components';

const Loading = (props) => {
  return (
    <CenteredDiv>
      <StyledSpinner/>
    </CenteredDiv>
  );
};

const StyledSpinner = styled(Spinner)`
  position: relative;
  right: auto;
  width: 80%;
  max-width: 200px;
  height: auto;
  path {
    fill: white;
  }
`;

export default Loading;
