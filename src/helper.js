const cleanMovies = (movies) => {
  return movies.map(movie => {
    const { title, backdrop_path, poster_path, overview, original_language, popularity, id, genre_ids} = movie
    return ({
      id,
      title, 
      backdrop_path,
      poster_path,
      overview,
      original_language,
      popularity,
      genre_ids,
    })
  })
}

export default cleanMovies