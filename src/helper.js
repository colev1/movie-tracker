export const cleanMovies = (movies) => {
	return movies.map(movie => {
		const { title, backdrop_path, poster_path, overview, 
			original_language, popularity, id, genre_ids, 
			release_date, vote_average} = movie
		return ({
			movie_id: id,
			title, 
			backdrop_path,
			poster_path,
			overview,
			original_language,
			popularity,
			genre_ids,
			release_date,
			vote_average
		})
	})
}

export const sqlSearchString = (searchString) => {
  return searchString.replace(' ', '%20')
}