import * as api from "../api";

export const REGISTER_START = "REGISTER_START";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";

export const register = ({ name, email, password }) => dispatch => {
  dispatch({ type: REGISTER_START });
  return api
    .register({ name, email, password })
    .then(res => {
      localStorage.setItem("userToken", res.data.token);
      dispatch({ type: REGISTER_SUCCESS, payload: res.data });
    })
    .catch(error => dispatch({ type: REGISTER_FAILURE, error: error }));
};

export const LOGIN_START = "LOGIN_START";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const login = ({ email, password }) => dispatch => {
  dispatch({ type: LOGIN_START });
  return api
    .login({ email, password })
    .then(res => {
      localStorage.setItem("userToken", res.data.token);
      dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    })
    .catch(error => dispatch({ type: LOGIN_FAILURE, error: error }));
};

export const REFRESH_START = "REFRESH_START";
export const REFRESH_SUCCESS = "REFRESH_SUCCESS";
export const REFRESH_FAILURE = "REFRESH_FAILURE";

export const refresh = () => dispatch => {
  dispatch({ type: REFRESH_START });
  return api
    .refreshJWT()
    .then(res => {
      localStorage.setItem("userToken", res.data.token);
      dispatch({ type: REFRESH_SUCCESS, payload: res.data });
    })
    .catch(error => dispatch({ type: REFRESH_FAILURE, error: error }));
};
