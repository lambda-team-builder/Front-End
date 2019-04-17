import {
  GET_CLASSROOM_START, GET_CLASSROOM_SUCCESS, GET_CLASSROOM_FAILURE,
  ADD_PROJECT_START, ADD_PROJECT_SUCCESS, ADD_PROJECT_FAILURE,
  // GET_PROJECT_START, GET_PROJECT_SUCCESS, GET_PROJECT_FAILURE,
  EDIT_CLASSROOM_START, EDIT_CLASSROOM_SUCCESS, EDIT_CLASSROOM_FAILURE,
  CREATE_SLOT_START, CREATE_SLOT_SUCCESS, CREATE_SLOT_FAILURE,
  REMOVE_USER_FROM_SLOT_START, REMOVE_USER_FROM_SLOT_SUCCESS, REMOVE_USER_FROM_SLOT_FAILURE,
} from './actions.js';

const initialState = {
  id: null,
  name: " ",
  projects: [],
  gettingClassroom: false,
  classroomError: null,
  addingProject: false,
  addingProjectError: null,
  editingClassroom: false,
  editClassroomError: null,
  removingUserFromSlot: false,
  removeUserFromSlotError: null,
  creatingSlot: false,
  createSlotError: null
};

const transformRoles = roles => {
  // makes roles keyed by role_name
  let newRoles = roles.reduce((acc, role) => (
    Object.assign(acc, {[role.role_name]: (acc[role.role_name] || []).concat(role)})), {});
  // transform to array and sort by role_name
  newRoles = Object.entries(newRoles).sort(([nameA], [nameB]) => nameA < nameB ? 0 : 1);
  // transform to map
  newRoles = newRoles.map(([name, slots]) => ({
    name, 
    slots,
    empty: slots.filter(s => !s.user_id).length,
    id: slots[0].role_id
  }));
  return newRoles;
};

export const classroomReducer = (state = initialState, action) => {
  switch (action.type) {
  case GET_CLASSROOM_START:
    return {
      ...state,
      // id: null,
      // name: " ",
      // projects: [],
      gettingClassroom: true,
      classroomError: null
    };
  case GET_CLASSROOM_SUCCESS:
    // group roles by role_name
    var projects = action.payload.projects.map(p => (
      {
        ...p,
        // roles: p.roles.reduce((acc, role) => (
        //   Object.assign(acc, {[role.role_name]: (acc[role.role_name] || []).concat(role)})), {})
        roles: transformRoles(p.roles)
      }
    ));
    return {
      ...state,
      ...action.payload,
      projects: projects,
      gettingClassroom: false,
      classroomError: null
    };
  case GET_CLASSROOM_FAILURE:
    return {
      ...state,
      // classroom: {},
      gettingClassroom: false,
      classroomError: action.error
    };
  // add project to classroom
  case ADD_PROJECT_START:
    return {
      ...state,
      addingProject: true,
      addingProjectError: null
    };
  case ADD_PROJECT_SUCCESS:
    return {
      ...state,
      addingProject: false,
      addingProjectError: null
    };
  case ADD_PROJECT_FAILURE:
    return {
      ...state,
      addingProject: false,
      addingProjectError: action.error
    };
  // Rooute is bugged
  // get project
  // case GET_PROJECT_START:
  //   return {
  //     ...state,
  //     getingProject: true,
  //     getingProjectError: null
  //   };
  // case GET_PROJECT_SUCCESS:
  //   if (action.classroom_id === state.id) {
  //     var projects = [state.projects];
  //     var projectIdx = projects.findIndex(({id}) => id === action.payload.id);
  //     console.log(action.payload, projectIdx);
  //     if (projectIdx >= 0) {
  //       projects[projectIdx] = {
  //         ...action.payload,
  //         roles: transformRoles(action.payload.roles)
  //       };
  //     }
  //     return {
  //       ...state,
  //       projects,
  //       getingProject: false,
  //       getingProjectError: null
  //     };
  //   } else {
  //     return {
  //       ...state,
  //       getingProject: false,
  //       getingProjectError: null
  //     };
  //   }
  // case GET_PROJECT_FAILURE:
  //   return {
  //     ...state,
  //     getingProject: false,
  //     getingProjectError: action.error
  //   };
  case EDIT_CLASSROOM_START:
    return {
      ...state,
      editingClassroom: true,
      editClassroomError: null
    };
  case EDIT_CLASSROOM_SUCCESS:
    return {
      ...state,
      name: (state.id === action.payload.id ? action.payload.name : state.name),
      editingClassroom: false,
      editClassroomError: null
    };
  case EDIT_CLASSROOM_FAILURE:
    return {
      ...state,
      editingClassroom: false,
      editClassroomError: action.error
    };
  case REMOVE_USER_FROM_SLOT_START:
    return {
      ...state,
      removingUserFromSlot: true,
      removeUserFromSlotError: null
    };
  case REMOVE_USER_FROM_SLOT_SUCCESS:
    return {
      ...state,
      removingUserFromSlot: false,
      removeUserFromSlotError: null
    };
  case REMOVE_USER_FROM_SLOT_FAILURE:
    return {
      ...state,
      removingUserFromSlot: false,
      removeUserFromSlotError: action.error
    };
  case CREATE_SLOT_START:
    return {
      ...state,
      creatingSlot: true,
      createSlotError: null,
    };
  case CREATE_SLOT_SUCCESS:
    return {
      ...state,
      creatingSlot: false,
      createSlotError: null,
    };
  case CREATE_SLOT_FAILURE:
    return {
      ...state,
      creatingSlot: false,
      createSlotError: action.error,
    };
  default:
    return state;
  }
};
