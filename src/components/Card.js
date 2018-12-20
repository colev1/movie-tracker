import React from 'react'
import './Card.scss'

const Card = (props) => {
  const posterPath = `https://image.tmdb.org/t/p/w500/${props.movie.poster_path}`
  return (
    <div className="movie-card">
      <article className="card-text">
        <h1>{props.movie.title}</h1>
        <p> {props.movie.overview} </p>
      </article>
      <article className='poster'>
      <img src={posterPath} />
      </article>
    </div>
  )
}

export default Card