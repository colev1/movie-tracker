import { favoritesReducer } from './favoritesReducer'
import * as actions from '../actions'

describe('favoritesReducer', () => {
  it('should return default state', () => {
    const expected = []
    const result = favoritesReducer(undefined, {})
    expect(result).toEqual(expected)
  })

  it('should return the state with a new favorite ', () => {
    const favorite = {movie: 'movie name'}
    const expected = [favorite]
    const result = favoritesReducer([], actions.addFavorite(favorite))
    expect(result).toEqual(expected)
  })

  it('should return an array of favorites', () => {
    const favorites = [{movie: 'movie name'},{movie: 'movie name'}]
    const result = favoritesReducer([], actions.addFavorites(favorites))
    expect(result).toEqual(favorites)

  })

  it('should return the state with a favorite removed', () => {
    const initial = [{movie: 'movie name', movie_id: 1},{movie: 'movie name2', movie_id: 2}]
    const favorite = {movie: 'movie name', movie_id: 1}
    const expected = [{movie: 'movie name2', movie_id: 2}]
    const result = favoritesReducer(initial, actions.deleteFavoriteFromStore(favorite))
    expect(result).toEqual(expected)
  })

  it('should return no favorites in state if the user logs out', () => {
    const initial = [{movie: 'movie name'},{movie: 'movie name2'}]
    const expected = []
    const result = favoritesReducer(undefined, actions.logout())
    expect(result).toEqual(expected)
  })
})