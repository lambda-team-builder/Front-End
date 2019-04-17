import React, { Component } from "react";
import Login from "./scenes/Login";
import { Route } from "react-router-dom";
import Register from "./scenes/Register";
import Home from './scenes/Home';
import styled from "styled-components";

const App = props => {
  return (
    <div>
      <StyledH1> Team Builder Frontend </StyledH1>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/home" component={Home} />
    </div>
  );
};

export default App;

const StyledH1 = styled.h1`
  display: flex;
  justify-content: center;
  margin: 0 auto;
`;
