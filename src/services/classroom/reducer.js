import {
  GET_CLASSROOM_START, GET_CLASSROOM_SUCCESS, GET_CLASSROOM_FAILURE,
  ADD_PROJECT_START, ADD_PROJECT_SUCCESS, ADD_PROJECT_FAILURE,
} from './actions.js';

const initialState = {
  id: null,
  name: " ",
  projects: [],
  gettingClassroom: false,
  classroomError: null,
  addingProject: false,
  addingProjectError: null
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
  default:
    return state;
  }
};
