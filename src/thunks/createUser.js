import { isLoading, hasErrored, loginUserAction } from '../actions'

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
      dispatch(loginUserAction(newUser))
    } catch(err) {
      dispatch(hasErrored(err.message));
    }
  }
}