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

export const addMovies = (movies) => {
  return {
    type: 'ADD_MOVIES',
    movies
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