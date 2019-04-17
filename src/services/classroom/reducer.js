import {
  GET_CLASSROOM_START, GET_CLASSROOM_SUCCESS, GET_CLASSROOM_FAILURE,
  ADD_PROJECT_START, ADD_PROJECT_SUCCESS, ADD_PROJECT_FAILURE,
  EDIT_CLASSROOM_START, EDIT_CLASSROOM_SUCCESS, EDIT_CLASSROOM_FAILURE,
} from './actions.js';

const initialState = {
  id: null,
  name: " ",
  projects: [],
  gettingClassroom: false,
  classroomError: null,
  addingProject: false,
  addingProjectError: null,
  editingClassroom: false,
  editClassroomError: null,
};

export const classroomReducer = (state = initialState, action) => {
  switch (action.type) {
  case GET_CLASSROOM_START:
    return {
      ...state,
      id: null,
      name: " ",
      projects: [],
      gettingClassroom: true,
      classroomError: null
    };
  case GET_CLASSROOM_SUCCESS:
    // group roles by role_name
    const projects = action.payload.projects.map(p => (
      {
        ...p,
        roles: p.roles.reduce((acc, role) => (
          Object.assign(acc, {[role.role_name]: (acc[role.role_name] || []).concat(role)})), {})
      }
    ));
    return {
      ...state,
      ...action.payload,
      projects: projects,
      gettingClassroom: false,
      classroomError: null
    };
  case GET_CLASSROOM_FAILURE:
    return {
      ...state,
      classroom: {},
      gettingClassroom: false,
      classroomError: action.error
    };
  // add project to classroom
  case ADD_PROJECT_START:
    return {
      ...state,
      addingProject: true,
      addingProjectError: null
    };
  case ADD_PROJECT_SUCCESS:
    return {
      ...state,
      addingProject: false,
      addingProjectError: null
    };
  case ADD_PROJECT_FAILURE:
    return {
      ...state,
      addingProject: false,
      addingProjectError: action.error
    };
  case EDIT_CLASSROOM_START:
    return {
      ...state,
      editingClassroom: true,
      editClassroomError: null
    };
  case EDIT_CLASSROOM_SUCCESS:
    return {
      ...state,
      name: (state.id === action.payload.id ? action.payload.name : state.name),
      editingClassroom: false,
      editClassroomError: null
    };
  case EDIT_CLASSROOM_FAILURE:
    return {
      ...state,
      editingClassroom: false,
      editClassroomError: action.error
    };
  default:
    return state;
  }
};
