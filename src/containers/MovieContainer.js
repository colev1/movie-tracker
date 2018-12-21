import React, { Component } from 'react'
import Card from '../components/Card'
import { connect } from 'react-redux'
import './MovieContainer.scss'
import SearchBar from './SearchBar'

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
      <SearchBar />
      { movies }
    </div>
  )
}

const mapStateToProps = (state) => ({
  movies: state.movies,
  favorites: state.favorites
})

export default connect(mapStateToProps)(MovieContainer)