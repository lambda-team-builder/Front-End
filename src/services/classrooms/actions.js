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
