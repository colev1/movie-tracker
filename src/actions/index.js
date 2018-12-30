export const loginUser = (userObject) => {
  return {
    type: 'LOGIN_USER',
    userObject
  }
}

export const logout = () => {
  return {
    type: 'LOGOUT_USER'
  }
}

export const addFavorite = (favorite) => {
  return {
    type: 'ADD_FAVORITE',
    favorite
  }
}

export const deleteFavoriteFromStore = (favorite) => {
  return {
    type: 'REMOVE_FAVORITE',
    favorite
  }
}

export const addFavorites = (favorites) => {
  return {
    type: 'ADD_FAVORITES',
    favorites
  }
}

export const isLoading = (bool) => {
  return {
    type: 'IS_LOADING',
    isLoading: bool
  }
}

export const hasErrored = (message) => ({
   type: 'HAS_ERRORED',
   message
})

export const fetchMoviesSuccess = (movies) => {
  return {
    type: 'FETCH_MOVIES_SUCCESS',
    movies
  }
}

export const searchMovieSuccess = (movies) => {
  return {
    type: 'SEARCH_MOVIES_SUCCESS',
    movies
  }
}