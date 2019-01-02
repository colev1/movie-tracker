import { isLoading, hasErrored, loginUserAction } from '../actions'

export const loginUser = (user) => {
  const url = 'http://localhost:3000/api/users/';
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
      const result = await response.json()
      dispatch(loginUserAction(result.data))
      dispatch(hasErrored(''))
    } catch(err) {
      dispatch(hasErrored(err.message));
    }
  }
}