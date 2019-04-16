import axios from 'axios';

const backendHost = (process.env.NODE_ENV === "development"
                     ? "http://localhost:5000"
                     : "some-heroku-url");

const API_URL = `${backendHost}/api`;

const axiosWithAuth = () => {
  const token = localStorage.getItem('userToken');
  return axios.create({
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${token}`,
    }
  });
};

// user registration and authentication
export const register = ({name, email, password}) => {
  return axios.post(`${API_URL}/auth/register`, {name, email, password});
};

export const login = ({email, password}) => {
  return axios.put(`${API_URL}/auth/login`, {email, password});
};
