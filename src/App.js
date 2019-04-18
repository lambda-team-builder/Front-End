import React, { Component } from "react";
import Login from "./scenes/Login";
import { Route } from "react-router-dom";
import Register from "./scenes/Register";
import Home from './scenes/Home';
import Classroom from './scenes/Classroom';
import Landing from './scenes/Landing';
import styled from "styled-components";

const App = props => {
  return (
    <AppDiv>
      <Route exact path="/" component={Landing}/>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/home" component={Home} />
      <Route path="/c/:classroom_id/:name?/" component={Classroom} />
    </AppDiv>
  );
};

export default App;

const AppDiv = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  margin: 0;
  padding: 0;
`;
