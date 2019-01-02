import React, { Component } from 'react'
import {connect} from 'react-redux'
import { deleteFavorite } from '../thunks/deleteFavorite'
import { postFavorite } from '../thunks/addFavorite'
import { Link } from 'react-router-dom'
import './Card.scss'

export class Card extends Component {
  toggleFavorite = () => {
    const {movie, user, favorites} = this.props
    const matchingFavorite = favorites.find(faveMovie => {
      return faveMovie.movie_id === movie.movie_id
    })
    if(!matchingFavorite) {
      this.props.postFavorite(movie, user.id)
    } else {
      this.props.deleteFavoriteFromStore(movie, user.id)
    }
  }
  
  render() {
    const faves = this.props.favorites.find(fave => {
      return fave.movie_id === this.props.movie.movie_id
    })
    let favoriteClass = faves ? 'favorite-movie favorite-btn' : 'favorite-btn'
    const posterPath = `https://image.tmdb.org/t/p/w500/${this.props.movie.poster_path}`
    
    return (
      <div className="movie-card">
        {this.props.user.name ? <button className={favoriteClass} onClick={this.toggleFavorite}>Favorite</button> : <Link to='/login'><button className={favoriteClass}>Favorite</button></Link>}
        <article className="card-text">
          <h1 className="movie-title">{this.props.movie.title}</h1>
          <p> {this.props.movie.overview} </p>
        </article>
        <article className='poster'>
          <img src={posterPath} alt={this.props.movie.title} />
        </article>
      </div>
    )
  }
}

export const mapStateToProps = (state) => ({
  user: state.user,
  favorites: state.favorites
})

export const mapDispatchToProps = (dispatch) => ({
  postFavorite: (favorite, uid) => dispatch(postFavorite(favorite, uid)),
  deleteFavoriteFromStore: (movie, uid) => dispatch(deleteFavorite(movie, uid))
})

export default connect(mapStateToProps, mapDispatchToProps)(Card)
