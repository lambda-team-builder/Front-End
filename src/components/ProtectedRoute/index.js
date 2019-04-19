import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Loading from '../../components/Loading';

const ProtectedRoute = ({component: Component, authenticating, authenticated, refreshing, ...props}) => {
  console.log("here");
  console.log(authenticating, authenticated, refreshing);
  return (
    <Route {...props} render = {(props) => {
      const token = localStorage.getItem("userToken");
      if (authenticated && !refreshing) {
        return <Component {...props} />;
      } else if (authenticating || refreshing) {
        return <Loading/>;
      } else {
        return <Redirect to="/login"/>;
      }
    }}/>
  );
};

const mapStateToProps = ({session}) => ({
  authenticated: session.authenticated,
  authenticating: session.authenticating,
  refreshing: session.refreshing
});

export default connect(mapStateToProps, {})(ProtectedRoute);
