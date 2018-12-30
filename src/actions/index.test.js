import * as actions from './index'

describe('actions', () => {
  it('should have a type of LOGIN_USER with a user Object', () => {
    const userObject = {name: 'user', id: 1}
    const expected = {
      type: 'LOGIN_USER',
      userObject,
    }

    const result = actions.loginUser(userObject)
    expect(result).toEqual(expected)
  })

  it('should have a type of LOGOUT_USER', () => {
    const expected = {
      type: 'LOGOUT_USER',
    }

    const result = actions.logout()
    expect(result).toEqual(expected)
  })

  it('should have a type of FETCH_MOVIES with a movies array', () => {
    const movies = [{movie: 'great movie'}]
    const expected = {
      type: 'FETCH_MOVIES_SUCCESS',
      movies,
    }

    const result = actions.fetchMoviesSuccess(movies)
    expect(result).toEqual(expected)
  })

  it('should have a type of ADD_FAVORITE with a favorite Object', () => {
    const favorite = {movie: 'great movie'}
    const expected = {
      type: 'ADD_FAVORITE',
      favorite,
    }

    const result = actions.addFavorite(favorite)
    expect(result).toEqual(expected)
  })

  it('should have a type of REMOVE_FAVORITE with a favorite Object', () => {
    const favorite = {movie: 'great movie'}
    const expected = {
      type: 'REMOVE_FAVORITE',
      favorite,
    }

    const result = actions.deleteFavoriteFromStore(favorite)
    expect(result).toEqual(expected)
  })
   it('should have a type of ADD_FAVORITES with a favorites array', () => {
    const favorites = [{movie: 'great movie'}]
    const expected = {
      type: 'ADD_FAVORITES',
      favorites,
    }

    const result = actions.addFavorites(favorites)
    expect(result).toEqual(expected)
  })
})