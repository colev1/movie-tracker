import React from 'react'
import Card from '../components/Card'
import { connect } from 'react-redux'
import './MovieContainer.scss'
import SearchBar from './SearchBar'


export const MovieContainer = (props) => {
  let displayedMovies;
  if (props.match.path === '/favorites') {
    displayedMovies = props.favorites;
  } else {
    displayedMovies = props.movies
  }
  const movies = displayedMovies.map(movie => {
    return <Card movie={movie} key={movie.movie_id}/>
  })
  return (
    <div>
    <div className={displayedMovies.length===0 ? 'hidden' : 'movie-container'}>
      <SearchBar />
      { movies }
    </div>
    <h1 className={displayedMovies.length === 0 ? 'no-movies movie-container':'hidden'}>
      You have no favorited movies! Sign in to favorite a movie.
    </h1>
     </div>
  )
}

export const mapStateToProps = (state) => ({
  movies: state.movies,
  favorites: state.favorites
})

export default connect(mapStateToProps)(MovieContainer)