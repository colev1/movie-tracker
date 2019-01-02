import React from 'react'
import Card from '../components/Card'
import { connect } from 'react-redux'
import './MovieContainer.scss'
import SearchBar from './SearchBar'

export const MovieContainer = (props) => {
	let displayedMovies
	if (props.match.path === '/favorites') {
		displayedMovies = props.favorites
	} else {
		displayedMovies = props.movies
	}
	const movies = displayedMovies.map(movie => {
		return <Card movie={movie} key={movie.movie_id}/>
	})

	if (props.isLoading) {
		return (
			<div className="loading">
        LOADING...
			</div>
		)
	} else {
		return (
			<div>
				<SearchBar />
				<div className={displayedMovies.length === 0 ? 'hidden' : 'movie-container'}>
					{ movies }
				</div>
				<h1 className={displayedMovies.length === 0 && props.match.path === '/favorites' ? 'no-movies movie-container' : 'hidden'}>
          You have no favorited movies silly!
				</h1>
				<h1 className={displayedMovies.length === 0 && props.match.path === '/' ? 'no-movies movie-container' : 'hidden'}>
          No movies matched your search query.
				</h1>
			</div>
		)
	}
}

export const mapStateToProps = (state) => ({
	movies: state.movies,
	favorites: state.favorites,
	isLoading: state.isLoading,
	error: state.error
})

export default connect(mapStateToProps)(MovieContainer)