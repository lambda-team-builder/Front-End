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

export const GET_ADMIN_CLASSROOMS_START = 'GET_ADMIN_CLASSROOMS_START';
export const GET_ADMIN_CLASSROOMS_SUCCESS = 'GET_ADMIN_CLASSROOMS_SUCCESS';
export const GET_ADMIN_CLASSROOMS_FAILURE = 'GET_ADMIN_CLASSROOMS_FAILURE';

export const getAdminClassrooms = () => dispatch => {
  dispatch({ type: GET_ADMIN_CLASSROOMS_START });
  return api.getClassrooms()
    .then(res => dispatch({ type: GET_ADMIN_CLASSROOMS_SUCCESS, payload: res.data }))
    .catch(error => dispatch({ type: GET_ADMIN_CLASSROOMS_FAILURE, error: error }));
};

export const GET_MEMBER_PROJECTS_START = 'GET_MEMBER_PROJECTS_START';
export const GET_MEMBER_PROJECTS_SUCCESS = 'GET_MEMBER_PROJECTS_SUCCESS';
export const GET_MEMBER_PROJECTS_FAILURE = 'GET_MEMBER_PROJECTS_FAILURE';

export const getMemberProjects = () => dispatch => {
  dispatch({ type: GET_MEMBER_PROJECTS_START });
  return api.getMemberProjects()
    .then(res => dispatch({ type: GET_MEMBER_PROJECTS_SUCCESS, payload: res.data }))
    .catch(error => dispatch({ type: GET_MEMBER_PROJECTS_FAILURE, error: error }));
};

export const CREATE_CLASSROOM_START = 'CREATE_CLASSROOM_START';
export const CREATE_CLASSROOM_SUCCESS = 'CREATE_CLASSROOM_SUCCESS';
export const CREATE_CLASSROOM_FAILURE = 'CREATE_CLASSROOM_FAILURE';

export const createClassroom = ({name, password}) => dispatch => {
  dispatch({ type: CREATE_CLASSROOM_START });
  return api.createClassroom({name, password: (password === "" ? null : password)})
    .then(res => dispatch({ type: CREATE_CLASSROOM_SUCCESS, payload: res.data }))
    .catch(error => dispatch({ type: CREATE_CLASSROOM_FAILURE, error: error }));
};
