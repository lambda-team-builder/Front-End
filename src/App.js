import React, { component } from "react";
import Login from "./scenes/Login";
import { Route } from "react-router-dom";
import Register from "./scenes/Register";
import styled from "styled-components";
import Home from "./scenes/Home";

const App = props => {
  return (
    <div>
      <StyledH1> Team Builder Frontend </StyledH1>
      <Route component={Login} path="/login" />
      <Route component={Register} path="/register" />
      <Route component={Home} path="/home" />
    </div>
  );
};

export default App;

const StyledH1 = styled.h1`
  display: flex;
  justify-content: center;
  margin: 0 auto;
`;
