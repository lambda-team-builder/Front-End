import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Login from '../../components/Loading';

const ProtectedRoute = ({component: Component, ...props}) => {
    console.log("here");
  return (
    <Route {...props} render = {(props) => {
      const token = localStorage.getItem("userToken");
      if (token) {
        return <Component {...props} />;
      }
      return <Redirect to="/login"/>;
    }}/>
  );
};

export default ProtectedRoute;
