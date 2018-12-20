import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { moviesReducer } from './moviesReducer';
import { favoritesReducer } from './favoritesReducer';


const rootReducer = combineReducers(
  {
    user: userReducer,
    movies: moviesReducer,
    favorites: favoritesReducer
  }
)

export default rootReducer;