import React from 'react';
import { CenteredDiv, AuthCard, Button } from 'styles';

const Join = ({classroom_id, joinClassroom, ...props}) => {
  return (
    <CenteredDiv>
      <AuthCard>
        <form onSubmit={e => {
               e.preventDefault();
               joinClassroom(classroom_id, {password: e.target.password.value === "" ? null : e.target.password.value});
             }}>
          <h1>Join Classroom</h1>
          <input type="password" placeholder="password" name="password" />
          <Button type="submit">Join</Button>
        </form>
      </AuthCard>
    </CenteredDiv>
  );
};

export default Join;
