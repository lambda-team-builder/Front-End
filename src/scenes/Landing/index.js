import React from 'react';
import { Link } from 'react-router-dom';

const Landing = (props) => {
  return (
    <div>
      <Link to="/login">login</Link>
      <Link to="/register">register</Link>
    </div>
  );
};

export default Landing;
