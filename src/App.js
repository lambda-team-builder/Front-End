import React from 'react';

const App = (props) => {
  return (
    <div>
      <h1> Team Builder Frontend </h1>
      {JSON.stringify(props.sessionReducer)}
    </div>
  );
};

export default App;
