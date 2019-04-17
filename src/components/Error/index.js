import React from 'react';
import styled from 'styled-components';

const getErrorMessage = error => {
  if (typeof error === 'string') {
    return error;
  } else {
    return (error && error.response && error.response.data && error.response.data.message);
  }
};

const Error = ({error}) => {
  return (
    error ? <ErrorDiv>{getErrorMessage(error)}</ErrorDiv> : null
  );
};

const ErrorDiv = styled.div`
  color: red;
`;

export default Error;
