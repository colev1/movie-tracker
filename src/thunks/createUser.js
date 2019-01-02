import { isLoading, hasErrored, loginUserAction } from '../actions'
import { loginUser } from './loginUser';

export const createUser = (user) => {
  const url = 'http://localhost:3000/api/users/new'
  return async (dispatch) => {
    try {
      dispatch(isLoading(true))
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
      if (!response.ok) {
        throw Error(response.statusText)
      }
      dispatch(isLoading(false))
      const newUser = await response.json();
      const newUserToBeLoggedIn = {
        id: newUser.id,
        email: user.email,
        password: user.password,
        name: user.name
      }
      dispatch(loginUserAction(newUserToBeLoggedIn))
    } catch(err) {
      dispatch(hasErrored(err.message));
    }
  }
}