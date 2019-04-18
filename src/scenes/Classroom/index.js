import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  getClassroom, addProject, editClassroom, addUserToSlot, removeUserFromSlot, createSlot, getMembers,
  createRole, deleteSlot, updateProject,
} from '../../services/classroom/actions.js';
import Modal from 'components/Modal';
import Admin from './scenes/Admin';

const Classroom = (props) => {
  const classroom_id = props.match.params.classroom_id;
  useEffect(() => {
    props.getClassroom(classroom_id);
  }, [classroom_id]);
  const admin = true;
  if (admin === true) {
    return <Admin {...props} />;
  } else if (admin === false) {
    return <div>User</div>;
  } else {
    return <div>Loading</div>;
  }
};

const mapStateToProps = ({classroom}) => {
  return classroom;
};

export default connect(mapStateToProps, {
  getClassroom, addProject, editClassroom, addUserToSlot, removeUserFromSlot, createSlot,
  getMembers, createRole, deleteSlot, updateProject
})(Classroom);
