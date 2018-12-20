export const loginUser = (username) => {
  return {
    type: 'LOGIN_USER',
    username
  }
}

export const logout = () => {
  return {
    type: 'LOGOUT_USER'
  }
}

export const addMovies = (movies) => {
  return {
    type: 'ADD_MOVIES',
    movies
  }
}