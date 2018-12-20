export const favoritesReducer = (state=[], action) => {
  switch(action.type) {
    case 'ADD_FAVORITE':
      return [...state, action.favorite]
    case 'ADD_FAVORITES':
      return [...state, ...action.favorites]
    case 'REMOVE_FAVORITE':
      return state.filter(movie => movie.movie_id !== action.favorite.movie_id)
    case 'LOGOUT_USER':
      return []
    default: 
      return state
  }
}