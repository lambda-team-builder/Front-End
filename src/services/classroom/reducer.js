import {
  GET_CLASSROOM_START, GET_CLASSROOM_SUCCESS, GET_CLASSROOM_FAILURE,
} from './actions.js';

const initialState = {
  classroom: {},
  gettingClassroom: false,
  classroomError: null
};

export const classroomReducer = (state = initialState, action) => {
  switch (action.type) {
  case GET_CLASSROOM_START:
    return {
      ...state,
      classroom: {},
      gettingClassroom: true,
      classroomError: null
    };
  case GET_CLASSROOM_SUCCESS:
    return {
      ...state,
      classroom: action.payload,
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
  default:
    return state;
  }
};
