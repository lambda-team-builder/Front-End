import {
  REGISTER_START, REGISTER_SUCCESS, REGISTER_FAILURE,
  LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILURE,
} from './actions.js';

const initialState = {
  authenticated: false,
  authenticating: false,
  authetnicationError: null,
  registering: false,
  registrationError: null,
};

export const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    // Registration
  case REGISTER_START:
    return {
      ...state,
      authenticated: false,
      registering: true,
      registrationError: null,
    };
  case REGISTER_SUCCESS:
    return {
      ...state,
      authenticated: true,
      registering: false,
      registrationError: null,
    };
  case REGISTER_FAILURE:
    return {
      ...state,
      authenticated: false,
      registering: false,
      registrationError: action.error,
    };
    // Logging in
  case LOGIN_START:
    return {
      ...state,
      authenticated: false,
      authenticating: true,
      authenticationError: null,
    };
  case LOGIN_SUCCESS:
    return {
      ...state,
      authenticated: true,
      authenticating: false,
      authenticationError: null,
    };
  case LOGIN_FAILURE:
    return {
      ...state,
      authenticated: false,
      authenticating: false,
      authenticationError: action.error,
    };
  default:
    return state;
  }
};
