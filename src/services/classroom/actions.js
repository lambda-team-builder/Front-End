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

export const GET_MEMBERS_START = 'GET_MEMBERS_START';
export const GET_MEMBERS_SUCCESS = 'GET_MEMBERS_SUCCESS';
export const GET_MEMBERS_FAILURE = 'GET_MEMBERS_FAILURE';

export const getMembers = (id) => dispatch => {
  dispatch({ type: GET_MEMBERS_START });
  return api.getClassroomMembers(id)
    .then(res => dispatch({ type: GET_MEMBERS_SUCCESS, payload: res.data }))
    .catch(error => dispatch({ type: GET_MEMBERS_FAILURE, error: error }));
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

// export const GET_PROJECT_START = 'GET_PROJECT_START';
// export const GET_PROJECT_SUCCESS = 'GET_PROJECT_SUCCESS';
// export const GET_PROJECT_FAILURE = 'GET_PROJECT_FAILURE';

// export const getProject = (classroom_id, classroom_project_id) => dispatch => {
//   dispatch({ type: GET_PROJECT_START });
//   return api.getClassroomProject({classroom_id, classroom_project_id})
//     .then(res => dispatch({ type: GET_PROJECT_SUCCESS, payload: res.data, classroom_id }))
//     .catch(error => dispatch({ type: GET_PROJECT_FAILURE, error: error}));
// };

export const EDIT_CLASSROOM_START = 'EDIT_CLASSROOM_START';
export const EDIT_CLASSROOM_SUCCESS = 'EDIT_CLASSROOM_SUCCESS';
export const EDIT_CLASSROOM_FAILURE = 'EDIT_CLASSROOM_FAILURE';

export const editClassroom = (classroom_id, {name}) => dispatch => {
  dispatch({ type: EDIT_CLASSROOM_START });
  return api.editClassroom(classroom_id, {name})
    .then(res => dispatch({ type: EDIT_CLASSROOM_SUCCESS, payload: res.data }))
    .catch(error => dispatch({ type: EDIT_CLASSROOM_FAILURE, error: error}));
};

export const ADD_USER_TO_SLOT_START = 'ADD_USER_TO_SLOT_START';
export const ADD_USER_TO_SLOT_SUCCESS = 'ADD_USER_TO_SLOT_SUCCESS';
export const ADD_USER_TO_SLOT_FAILURE = 'ADD_USER_TO_SLOT_FAILURE';

export const addUserToSlot = (classroom_id, member_slot_id, {classroom_member_id}) => dispatch => {
  dispatch({ type: ADD_USER_TO_SLOT_START });
  return api.addUserToMemberSlot(member_slot_id, {classroom_member_id})
    .then(res => {
      dispatch({ type: ADD_USER_TO_SLOT_SUCCESS, payload: res.data });
      // return getProject(classroom_id*1, classroom_project_id)(dispatch);
      // I am aware doing this introduces a race condition where a user can
      // navigate to a different classroom and that request will execute and
      // finish before this one, and when this one does it will overwrite it. I
      // choosing to ignore it for now.
      return getClassroom(classroom_id)(dispatch);
    })
    .catch(error => dispatch({ type: ADD_USER_TO_SLOT_FAILURE, error: error}));
};

export const removeUserFromSlot = (classroom_id, member_slot_id) => dispatch => {
  return addUserToSlot(classroom_id, member_slot_id, {classroom_member_id: null})(dispatch);
};

export const CREATE_SLOT_START = 'CREATE_SLOT_START';
export const CREATE_SLOT_SUCCESS = 'CREATE_SLOT_SUCCESS';
export const CREATE_SLOT_FAILURE = 'CREATE_SLOT_FAILURE';

export const createSlot = (classroom_id, classroom_project_id, {role_id}) => dispatch => {
  dispatch({ type: CREATE_SLOT_START });
  return api.createMemberSlot(classroom_id, classroom_project_id, {role_id})
    .then(res => {
      dispatch({ type: CREATE_SLOT_SUCCESS, payload: res.data });
      // return getProject(classroom_id*1, classroom_project_id)(dispatch);
      // I am aware doing this introduces a race condition where a user can
      // navigate to a different classroom and that request will execute and
      // finish before this one, and when this one does it will overwrite it. I
      // choosing to ignore it for now.
      return getClassroom(classroom_id)(dispatch);
    })
    .catch(error => dispatch({ type: CREATE_SLOT_FAILURE, error: error}));
};

export const DELETE_SLOT_START = 'DELETE_SLOT_START';
export const DELETE_SLOT_SUCCESS = 'DELETE_SLOT_SUCCESS';
export const DELETE_SLOT_FAILURE = 'DELETE_SLOT_FAILURE';

export const deleteSlot = (classroom_id, classroom_project_id, project_member_id) => dispatch => {
  dispatch({ type: DELETE_SLOT_START });
  return api.deleteMemberSlot(classroom_id, classroom_project_id, project_member_id)
    .then(res => {
      dispatch({ type: DELETE_SLOT_SUCCESS, payload: res.data });
      return getClassroom(classroom_id)(dispatch);
    })
    .catch(error => dispatch({ type: DELETE_SLOT_FAILURE, error: error}));
};

export const CREATE_ROLE_START = 'CREATE_ROLE_START';
export const CREATE_ROLE_SUCCESS = 'CREATE_ROLE_SUCCESS';
export const CREATE_ROLE_FAILURE = 'CREATE_ROLE_FAILURE';

export const createRole = (classroom_id, classroom_project_id, {name}) => dispatch => {
  dispatch({ type: CREATE_ROLE_START });
  return api.createRole({name})
    .then(res => {
      return createSlot(classroom_id, classroom_project_id, {role_id: res.data.id})(dispatch)
        .then(() => dispatch({ type: CREATE_ROLE_SUCCESS, payload: res.data }));
    })
    .catch(error => dispatch({ type: CREATE_ROLE_FAILURE, error: error}));
};
