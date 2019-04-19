import React from 'react';
import { CenteredDiv, AuthCard, Button, BasicForm } from 'styles';
import Error from 'components/Error';

const Join = ({classroom_id, joinClassroom, joinClassroomError, ...props}) => {
  return (
    <CenteredDiv>
      <AuthCard>
        <BasicForm onSubmit={e => {
               e.preventDefault();
          const password = (e.target.password
                            && e.target.password.value !== ""
                            && e.target.password.value) || "   ";
               joinClassroom(classroom_id, {password: password});
             }}>
          <h1>Join Classroom</h1>
          <Error error={joinClassroomError}/>
          {joinClassroomError && <input type="password" placeholder="password" name="password" />}
          <Button type="submit">join</Button>
        </BasicForm>
      </AuthCard>
    </CenteredDiv>
  );
};

export default Join;
