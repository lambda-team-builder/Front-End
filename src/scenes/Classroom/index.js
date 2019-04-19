import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  getClassroom, addProject, editClassroom, addUserToSlot, removeUserFromSlot, createSlot, getMembers,
  createRole, deleteSlot, updateProject, joinClassroom, joinSlot, leaveSlot,
} from '../../services/classroom/actions.js';
import Modal from 'components/Modal';
import Admin from './scenes/Admin';
import Join from './scenes/Join';
import User from './scenes/User';
import Loading from './scenes/Loading';

const Classroom = props => {
  const classroom_id = props.match.params.classroom_id;
  useEffect(() => {
    props.getClassroom(classroom_id);
  }, [classroom_id]);
  if (props.id || props.id === 0 && !props.gettingClassroom) {
    if (props.is_admin === true) {
      return <Admin {...props} />;
    } else if (props.is_admin === false) {
      return <User {...props} />;
    }
  } else if (props.classroomError
             && props.classroomError.response
             && props.classroomError.response.status === 400){
    return (
      <Join classroom_id={classroom_id}
            joinClassroomError={props.joinClassroomError}
            joinClassroom={props.joinClassroom}/>
    );
  } 
  return <Loading/>;
};

const mapStateToProps = ({ classroom, session }) => {
  return {
    ...classroom,
    user_id: session.id,
  };
};

export default connect(mapStateToProps, {
  getClassroom, addProject, editClassroom, addUserToSlot, removeUserFromSlot, createSlot,
  getMembers, createRole, deleteSlot, updateProject, joinClassroom, joinSlot, leaveSlot,
})(Classroom);
