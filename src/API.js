import cleanMovies from './helper'


const fetchMovies = async (url) => {
  try {
    const response = await fetch(url)
    const result = await response.json()
    return cleanMovies(result.results)
  } catch(err) {
    console.log(err.message)
  }
}

export default fetchMovies