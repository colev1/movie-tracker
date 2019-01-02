import { isLoading, addFavorite, hasErrored } from '../actions';

export const postFavorite = (movie, uid) => {
  debugger;
  console.log(uid)
  const url = 'http://localhost:3000/api/users/favorites/new';
  return async (dispatch) => {
    try {
      dispatch(isLoading(true))
      const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({...movie, user_id: uid})
    })
    if (!response.ok) {
      throw Error(response.statusText)
    }
    dispatch(isLoading(false))
    const result = await response.json();
    dispatch(addFavorite(movie));
  } catch (err) {
    dispatch(hasErrored(err.message))
    }
  }
  
}