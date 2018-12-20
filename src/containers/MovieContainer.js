import React, { Component } from 'react'
import Card from '../components/Card'
import { connect } from 'react-redux'
import './MovieContainer.scss'

const MovieContainer = (props) => {
  const movies = props.movies.map(movie => {
    return <Card movie={movie} key={movie.title}/>
  })

  return (
    <div className="movie-container">
      { movies }
    </div>
  )
}

const mapStateToProps = (state) => ({
  movies: state.movies
})

export default connect(mapStateToProps)(MovieContainer)