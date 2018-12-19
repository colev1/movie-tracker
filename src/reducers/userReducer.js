import { loginUser } from '../actions';

export const userReducer = (state = '', action) => {
  switch(action.type) {
    case 'LOGIN_USER':
      return action.username
    default:
      return state
  }
}