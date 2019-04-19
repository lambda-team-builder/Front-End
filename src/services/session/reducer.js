import {
  REGISTER_START, REGISTER_SUCCESS, REGISTER_FAILURE,
  LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILURE,
  REFRESH_START, REFRESH_SUCCESS, REFRESH_FAILURE,
} from './actions.js';

const initialState = {
  id: null,
  name: null,
  email: null,
  token: null,
  authenticated: false,
  authenticating: false,
  authetnicationError: null,
  registering: false,
  registrationError: null,
  refreshing: false,
  refreshError: null,
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
      ...action.payload,
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
      ...action.payload,
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
  case REFRESH_START:
    return {
      ...state,
      refreshing: true,
      refreshError: null,
    };
  case REFRESH_SUCCESS:
    return {
      ...state,
      ...action.payload,
      authenticated: true,
      refreshing: false,
      refreshError: null,
    };
  case REFRESH_FAILURE:
    return {
      ...state,
      authenticated: false,
      refreshing: false,
      refreshError: action.error,
    };
  default:
    return state;
  }
};
