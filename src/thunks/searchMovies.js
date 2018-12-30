import { isLoading, searchMovieSuccess, hasErrored } from '../actions'
import { cleanMovies, SQLsearchString } from '../helper'
import apiKey from '../apiKey'


export const searchMovies = (searchString) => {
  const querySearchString = SQLsearchString(searchString)
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${querySearchString}`
  return async (dispatch) => {
    try {
      dispatch(isLoading(true))
      const response = await fetch(url)
      if (!response.ok) {
        throw Error(response.statusText)
      }
      dispatch(isLoading(false))
      const result = await response.json()
      const searchedMovies = cleanMovies(result.results)
      dispatch(searchMovieSuccess(searchedMovies))
    } catch (err) {
      dispatch(hasErrored(err.message))
    }
  }  
}
