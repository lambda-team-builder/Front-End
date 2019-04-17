import * as api from '../api';

export const GET_CLASSROOM_START = 'GET_CLASSROOM_START';
export const GET_CLASSROOM_SUCCESS = 'GET_CLASSROOM_SUCCESS';
export const GET_CLASSROOM_FAILURE = 'GET_CLASSROOM_FAILURE';

export const getClassroom = (id) => dispatch => {
  dispatch({ type: GET_CLASSROOM_START });
  return api.getClassroom(id)
    .then(res => dispatch({ type: GET_CLASSROOM_SUCCESS, payload: res.data }))
    .catch(error => dispatch({ type: GET_CLASSROOM_FAILURE, error: error }));
};

export const ADD_PROJECT_START = 'ADD_PROJECT_START';
export const ADD_PROJECT_SUCCESS = 'ADD_PROJECT_SUCCESS';
export const ADD_PROJECT_FAILURE = 'ADD_PROJECT_FAILURE';

export const addProject = (classroom_id, {name, description}) => dispatch => {
  dispatch({ type: ADD_PROJECT_START });
  return api.createProject({name, description})
    .then(res => (
      api.addProjectToClassroom(classroom_id, {project_id: res.data.id})
        .then(() => {
          dispatch({ type: ADD_PROJECT_SUCCESS });
          getClassroom(classroom_id)(dispatch);
        })
        .catch(error => dispatch({ type: ADD_PROJECT_FAILURE, error: error }))
    ))
    .catch(error => dispatch({ type: ADD_PROJECT_FAILURE, error: error}));
};

export const EDIT_CLASSROOM_START = 'EDIT_CLASSROOM_START';
export const EDIT_CLASSROOM_SUCCESS = 'EDIT_CLASSROOM_SUCCESS';
export const EDIT_CLASSROOM_FAILURE = 'EDIT_CLASSROOM_FAILURE';

export const editClassroom = (classroom_id, {name}) => dispatch => {
  dispatch({ type: EDIT_CLASSROOM_START });
  return api.editClassroom(classroom_id, {name})
    .then(res => dispatch({ type: EDIT_CLASSROOM_SUCCESS, payload: res.data }))
    .catch(error => dispatch({ type: EDIT_CLASSROOM_FAILURE, error: error}));
};
