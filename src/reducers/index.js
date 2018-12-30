import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { isLoading, hasErrored, moviesReducer } from './moviesReducer';
import { favoritesReducer } from './favoritesReducer';


const rootReducer = combineReducers(
  {
    user: userReducer,
    movies: moviesReducer,
    favorites: favoritesReducer,
    isLoading: isLoading,
    error: hasErrored
  }
)

export default rootReducer;