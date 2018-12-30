import { moviesReducer } from './moviesReducer'
import * as actions from '../actions'

describe('moviesReducer', () => {
  it('should return default state', () => {
    const expected = []
    const result = moviesReducer(undefined, {})
    expect(result).toEqual(expected)
  })

  it('should return the state with an array of movies', () => {
    const movies = [{movie: 'movie name'}]
    const result = moviesReducer(undefined, actions.fetchMoviesSuccess(movies))
    expect(result).toEqual(movies)
  })
})