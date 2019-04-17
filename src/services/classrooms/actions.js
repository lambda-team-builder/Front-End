import * as api from '../api';

export const GET_CLASSROOMS_START = 'GET_CLASSROOMS_START';
export const GET_CLASSROOMS_SUCCESS = 'GET_CLASSROOMS_SUCCESS';
export const GET_CLASSROOMS_FAILURE = 'GET_CLASSROOMS_FAILURE';

export const getClassrooms = () => dispatch => {
  dispatch({ type: GET_CLASSROOMS_START });
  return api.getClassrooms()
    .then(res => dispatch({ type: GET_CLASSROOMS_SUCCESS, payload: res.data }))
    .catch(error => dispatch({ type: GET_CLASSROOMS_FAILURE, error: error }));
};

export const CREATE_CLASSROOM_START = 'CREATE_CLASSROOM_START';
export const CREATE_CLASSROOM_SUCCESS = 'CREATE_CLASSROOM_SUCCESS';
export const CREATE_CLASSROOM_FAILURE = 'CREATE_CLASSROOM_FAILURE';

export const createClassroom = ({name}) => dispatch => {
  dispatch({ type: CREATE_CLASSROOM_START });
  return api.createClassroom({name})
    .then(res => dispatch({ type: CREATE_CLASSROOM_SUCCESS, payload: res.data }) && true)
    .catch(error => dispatch({ type: CREATE_CLASSROOM_FAILURE, error: error }) && false);
};
