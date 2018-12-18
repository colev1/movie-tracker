import React, { Component } from 'react'
import Card from './Card'


const MovieContainer = (props) => {
  const movies = props.movies.map(movie => {
    return <Card movie={movie}/>
  })

  return (
    <div>
      { movies }
    </div>
  )
}

export default MovieContainer;