import React from 'react';
import { Button, Spinner } from '../../styles';

const ButtonSpinner = ({loading, children, ...props}) => {
  return (
    <Button {...props}>
      {children}
      {loading && <Spinner/>}
    </Button>
  );
};

export default ButtonSpinner;
