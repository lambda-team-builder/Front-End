export const getErrorMessage = error => {
  if (typeof error === 'string') {
    return error
  } else {
    return (error && error.response && error.response.data && error.response.data.message);
  }
};
