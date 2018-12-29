import { isLoading, fetchMoviesSuccess } from '../actions'
import cleanMovies from '../API';

export const fetchMovies = async (page) => {
  let selectedPage = page || 1;
  let url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=${selectedPage}`
  return async (dispatch) =>  {
    try {
      dispatch(isLoading(true))
      const response = await fetch(url)
      dispatch(isLoading(false))
      const result = await response.json()
      const movies = cleanMovies(result.results)
      dispatch(fetchMoviesSuccess(movies))
    } catch (error) {
      // dispatch(hasErrored(true))
      console.log(err.message)
    }
  }
}