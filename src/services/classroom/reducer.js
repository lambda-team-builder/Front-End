import {
  GET_CLASSROOM_START, GET_CLASSROOM_SUCCESS, GET_CLASSROOM_FAILURE,
  ADD_PROJECT_START, ADD_PROJECT_SUCCESS, ADD_PROJECT_FAILURE,
  // GET_PROJECT_START, GET_PROJECT_SUCCESS, GET_PROJECT_FAILURE,
  UPDATE_PROJECT_START, UPDATE_PROJECT_SUCCESS, UPDATE_PROJECT_FAILURE,
  EDIT_CLASSROOM_START, EDIT_CLASSROOM_SUCCESS, EDIT_CLASSROOM_FAILURE,
  CREATE_SLOT_START, CREATE_SLOT_SUCCESS, CREATE_SLOT_FAILURE,
  DELETE_SLOT_START, DELETE_SLOT_SUCCESS, DELETE_SLOT_FAILURE,
  CREATE_ROLE_START, CREATE_ROLE_SUCCESS, CREATE_ROLE_FAILURE,
  JOIN_CLASSROOM_START, JOIN_CLASSROOM_SUCCESS, JOIN_CLASSROOM_FAILURE,
  JOIN_SLOT_START, JOIN_SLOT_SUCCESS, JOIN_SLOT_FAILURE,
  LEAVE_SLOT_START, LEAVE_SLOT_SUCCESS, LEAVE_SLOT_FAILURE,
  ADD_USER_TO_SLOT_START, ADD_USER_TO_SLOT_SUCCESS, ADD_USER_TO_SLOT_FAILURE,
  GET_MEMBERS_START, GET_MEMBERS_SUCCESS, GET_MEMBERS_FAILURE,
} from './actions.js';

const initialState = {
  id: null,
  is_admin: null,
  name: " ",
  projects: [],
  gettingClassroom: false,
  classroomError: null,
  addingProject: false,
  addingProjectError: null,
  editingClassroom: false,
  editClassroomError: null,
  addingUserToSlot: false,
  addUserToSlotError: null,
  creatingSlot: false,
  createSlotError: null,
  gettingMembers: false,
  members: [],
  getMembersError: null,
  creatingRole: false,
  createRoleError: null,
  deletingSlot: false,
  deleteSlotError: null,
  updatingProject: false,
  updateProjectError: null,
  joiningClassroom: false,
  joinClassroomError: null,
  joiningSlot: false,
  joinSlotError: null,
  leavingSlot: false,
  leaveSlotError: null,
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

const getUniqueRoles = projects => {
  const ids = {};
  return projects
    .reduce((acc, {roles}) => {
      roles.forEach(({id, name}) => ids[id] || ((ids[id] = true) && acc.push({id, name})));
      return acc;
    }, []);
};

export const classroomReducer = (state = initialState, action) => {
  switch (action.type) {
  case GET_CLASSROOM_START:
    console.log(state.id, action.classroom_id);
    var payload = (state.id !== action.classroom_id
                   ? {projects: [],
                      id: null,
                      name: " ",
                      is_admin: null,
                      members: []}
                   : {});
    return {
      ...state,
      ...payload,
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
      uniqueRoles: getUniqueRoles(projects),
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
  case ADD_USER_TO_SLOT_START:
    return {
      ...state,
      addingUserToSlot: true,
      addUserToSlotError: null
    };
  case ADD_USER_TO_SLOT_SUCCESS:
    return {
      ...state,
      addingUserToSlot: false,
      addUserToSlotError: null
    };
  case ADD_USER_TO_SLOT_FAILURE:
    return {
      ...state,
      addingUserToSlot: false,
      addUserToSlotError: action.error
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
  case DELETE_SLOT_START:
    return {
      ...state,
      deletingSlot: true,
      deleteSlotError: null,
    };
  case DELETE_SLOT_SUCCESS:
    return {
      ...state,
      deletingSlot: false,
      deleteSlotError: null,
    };
  case DELETE_SLOT_FAILURE:
    return {
      ...state,
      deletingSlot: false,
      deleteSlotError: action.error,
    };
  case CREATE_ROLE_START:
    return {
      ...state,
      creatingRole: true,
      createRoleError: null,
    };
  case CREATE_ROLE_SUCCESS:
    return {
      ...state,
      creatingRole: false,
      createRoleError: null,
    };
  case CREATE_ROLE_FAILURE:
    return {
      ...state,
      creatingRole: false,
      createRoleError: action.error,
    };
  case GET_MEMBERS_START:
    return {
      ...state,
      gettingMembers: true,
      getMembersError: null,
    };
  case GET_MEMBERS_SUCCESS:
    return {
      ...state,
      gettingMembers: false,
      members: action.payload,
      getMembersError: null,
    };
  case GET_MEMBERS_FAILURE:
    return {
      ...state,
      gettingMembers: false,
      getMembersError: action.error,
    };
  case UPDATE_PROJECT_START:
    return {
      ...state,
      updatingProject: true,
      updateProjectError: null,
    };
  case UPDATE_PROJECT_SUCCESS:
    return {
      ...state,
      updatingProject: false,
      updateProjectError: null,
    };
  case UPDATE_PROJECT_FAILURE:
    return {
      ...state,
      updatingProject: false,
      updateProjectError: action.error,
    };
  case JOIN_CLASSROOM_START:
    return {
      ...state,
      joiningClassroom: true,
      joinClassroomError: null,
    };
  case JOIN_CLASSROOM_SUCCESS:
    return {
      ...state,
      joiningClassroom: false,
      joinClassroomError: null,
    };
  case JOIN_CLASSROOM_FAILURE:
    return {
      ...state,
      joiningClassroom: false,
      joinClassroomError: action.error,
    };
  case JOIN_SLOT_START:
    return {
      ...state,
      joiningSlot: true,
      joinSlotError: null,
    };
  case JOIN_SLOT_SUCCESS:
    return {
      ...state,
      joiningSlot: false,
      joinSlotError: null,
    };
  case JOIN_SLOT_FAILURE:
    return {
      ...state,
      joiningSlot: false,
      joinSlotError: action.error,
    };
  case LEAVE_SLOT_START:
    return {
      ...state,
      leavingSlot: true,
      leaveSlotError: null,
    };
  case LEAVE_SLOT_SUCCESS:
    return {
      ...state,
      leavingSlot: false,
      leaveSlotError: null,
    };
  case LEAVE_SLOT_FAILURE:
    return {
      ...state,
      leavingSlot: false,
      leaveSlotError: action.error,
    };
  case "RESET":
    return initialState;
  default:
    return state;
  }
};
