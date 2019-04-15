import React, { Component } from "react";
import Login from "./scenes/Login";
import { Route } from "react-router-dom";
import Register from "./scenes/Register";
import styled from "styled-components";

const App = props => {
  return (
    <div>
      <StyledH1> Team Builder Frontend </StyledH1>
      <Route component={Login} path="/login" />
      <Route component={Register} path="/register" />
    </div>
  );
};

export default App;

const StyledH1 = styled.h1`
  display: flex;
  justify-content: center;
  margin: 0 auto;
`;
