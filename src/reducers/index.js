import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { moviesReducer } from './moviesReducer';


const rootReducer = combineReducers(
  {
    user: userReducer,
    movies: moviesReducer
  }
)

export default rootReducer;