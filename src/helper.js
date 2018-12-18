const cleanMovies = (movies) => {
  return movies.map(movie => {
    return {
      title: movie.title
    }
  })
}

export default cleanMovies