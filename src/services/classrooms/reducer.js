import {
  GET_CLASSROOMS_START, GET_CLASSROOMS_SUCCESS, GET_CLASSROOMS_FAILURE,
  CREATE_CLASSROOM_START, CREATE_CLASSROOM_SUCCESS, CREATE_CLASSROOM_FAILURE,
  GET_ADMIN_CLASSROOMS_START, GET_ADMIN_CLASSROOMS_SUCCESS, GET_ADMIN_CLASSROOMS_FAILURE,
  GET_MEMBER_PROJECTS_START, GET_MEMBER_PROJECTS_SUCCESS, GET_MEMBER_PROJECTS_FAILURE,
} from './actions.js';

const initialState = {
  classroomsArr: [],
  gettingClassrooms: false,
  classroomsError: null,
  createdClassroom: null,
  creatingClassroom: false,
  createClassroomError: null,
  gettingAdminClassrooms: false,
  adminClassrooms: [],
  getAdminClassroomsError: null,
  gettingMemberProjects: false,
  memberProjects: [],
  getMemberProjectsError: null,
};

export const classroomsReducer = (state = initialState, action) => {
  switch (action.type) {
  // getting classrooms
  case GET_CLASSROOMS_START:
    return {
      ...state,
      gettingClassrooms: true,
      error: null
    };
  case GET_CLASSROOMS_SUCCESS:
    return {
      ...state,
      gettingClassrooms: false,
      classroomsArr: action.payload,
      error: null
    };
  case GET_CLASSROOMS_FAILURE:
    return {
      ...state,
      gettingClassrooms: false,
      error: action.error
    };
  case CREATE_CLASSROOM_START:
    return {
      ...state,
      createdClassroom: null,
      creatingClassroom: true,
      createClassroomError: null
    };
  case CREATE_CLASSROOM_SUCCESS:
    return {
      ...state,
      createdClassroom: action.payload,
      creatingClassroom: false,
      createClassroomError: null
    };
  case CREATE_CLASSROOM_FAILURE:
    return {
      ...state,
      creatingClassroom: false,
      createClassroomError: action.error
    };
  case GET_ADMIN_CLASSROOMS_START:
    return {
      ...state,
      gettingAdminClassrooms: true,
      getAdminClassroomsError: null,
    };
  case GET_ADMIN_CLASSROOMS_SUCCESS:
    return {
      ...state,
      gettingAdminClassrooms: false,
      adminClassrooms: action.payload,
      getAdminClassroomsError: null,
    };
  case GET_ADMIN_CLASSROOMS_FAILURE:
    return {
      ...state,
      gettingAdminClassrooms: false,
      getAdminClassroomsError: action.error,
    };
  case GET_MEMBER_PROJECTS_START:
    return {
      ...state,
      gettingMemberProjects: true,
      getMemberProjectsError: null,
    };
  case GET_MEMBER_PROJECTS_SUCCESS:
    return {
      ...state,
      gettingMemberProjects: false,
      memberProjects: action.payload,
      getMemberProjectsError: null,
    };
  case GET_MEMBER_PROJECTS_FAILURE:
    return {
      ...state,
      gettingMemberProjects: false,
      getMemberProjectsError: action.error,
    };
  default:
    return state;
  }
};
