const { REACT_APP_API_URL } = process.env;

export const {
  AUTH_BASIC_ENDPOINT,
  AUTH_CREATE_USER_ENDPOINT,
  GET_MOVIES_BY_SEARCH,
} = {
  AUTH_BASIC_ENDPOINT: `${REACT_APP_API_URL}/auth/get-auth-basic`,
  AUTH_CREATE_USER_ENDPOINT: `${REACT_APP_API_URL}/auth/post-create-user`,
  GET_MOVIES_BY_SEARCH: `${REACT_APP_API_URL}/movies/get-movies-by-search`,
};
