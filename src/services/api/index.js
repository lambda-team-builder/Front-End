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

// projects
export const createProject = ({name, description}) => {
  return axiosWithAuth.post(`${API_URL}/projects/`, {name, description});
};

export const getProjects = ({name, description}) => {
  return axiosWithAuth.get(`${API_URL}/projects/`, {name, description});
};

// roles
export const createRole = ({name}) => {
  return axiosWithAuth.post(`${API_URL}/roles/`, {name});
};

export const getRoles = () => {
  return axiosWithAuth.get(`${API_URL}/roles/`);
};

export const updateRole = (id, {name}) => {
  return axiosWithAuth.put(`${API_URL}/roles/${id}`, {name});
};

// classrooms
export const createClassroom = ({name}) => {
  return axiosWithAuth.post(`${API_URL}/classrooms`, {name});
};

export const editClassroom = (id, {name}) => {
  return axiosWithAuth.put(`${API_URL}/classrooms/${id}`, {name});
};

export const getClassroom = (id) => {
  return axiosWithAuth.get(`${API_URL}/classrooms/${id}`);
};

export const getClassrooms = () => {
  return axiosWithAuth.get(`${API_URL}/classrooms/`);
};

export const addProjectToClassroom = (classroom_id, {project_id}) => {
  return axiosWithAuth.post(`${API_URL}/classrooms/${classroom_id}`, {project_id});
};

export const getClasssroomProject = (classroom_id, classroom_project_id) => {
  return axiosWithAuth
    .get(`${API_URL}/classrooms/${classroom_id}/projects/${classroom_project_id}`);
};

export const createMemberSlot = (classroom_id, classroom_project_id, {role_id}) => {
  return axiosWithAuth
    .post(`${API_URL}/classrooms/${classroom_id}/projects/${classroom_project_id}/project_member`,
          {role_id});
};

