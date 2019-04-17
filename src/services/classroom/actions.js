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
      api.addProjectToClassroom(classroom_id, {project_id: res.id})
        .then(() => {
          dispatch({ type: ADD_PROJECT_SUCCESS });
          getClassroom(classroom_id);
        })
        .catch(error => dispatch({ type: ADD_PROJECT_FAILURE, error: error }))
    ))
    .catch(error => dispatch({ type: ADD_PROJECT_FAILURE, error: error}));
};
