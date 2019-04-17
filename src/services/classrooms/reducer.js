import {
  GET_CLASSROOMS_START, GET_CLASSROOMS_SUCCESS, GET_CLASSROOMS_FAILURE,
  CREATE_CLASSROOM_START, CREATE_CLASSROOM_SUCCESS, CREATE_CLASSROOM_FAILURE,
} from './actions.js';

const initialState = {
  classroomsArr: [],
  gettingClassrooms: false,
  classroomsError: null,
  createdClassroom: null,
  creatingClassroom: false,
  createClassroomError: null,
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
  default:
    return state;
  }
};
