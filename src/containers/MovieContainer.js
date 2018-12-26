import React from 'react'
import Card from '../components/Card'
import { connect } from 'react-redux'
import './MovieContainer.scss'

const MovieContainer = (props) => {
  let displayedMovies;
  if (props.match.path === '/favorites') {
    displayedMovies = props.favorites
  } else {
    displayedMovies = props.movies
  }
  const movies = displayedMovies.map(movie => {
    return <Card movie={movie} key={movie.title}/>
  })
  return (
    <div className="movie-container">
      { movies }
    </div>
  )
}

export const mapStateToProps = (state) => ({
  movies: state.movies,
  favorites: state.favorites
})

export default connect(mapStateToProps)(MovieContainer)