import {
  GET_CLASSROOMS_START, GET_CLASSROOMS_SUCCESS, GET_CLASSROOMS_FAILURE,
} from './actions.js';

const initialState = {
  classroomsArr: [],
  gettingClassrooms: false,
  classroomsError: null
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
  default:
    return state;
  }
};
