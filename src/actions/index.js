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