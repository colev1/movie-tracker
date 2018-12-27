import React, { Component } from 'react';
import './Card.scss'
import {connect} from 'react-redux';
import { postFavorite, deleteFavorite } from '../API';
import { addFavorite, deleteFavoriteFromStore } from '../actions';

class Card extends Component {
  constructor(props) {
    super(props)
  }
  
  toggleFavorite = () => {
    const {movie, user, favorites} = this.props;
    const matchingFavorite = favorites.find(faveMovie => {
      return faveMovie.movie_id === movie.movie_id
    })
    
    if(!matchingFavorite) {
      postFavorite(movie, user.id);
      this.props.addFavorite(movie);
    } else {
      deleteFavorite(user.id, movie.movie_id);
      this.props.deleteFavoriteFromStore(movie)
    }
  }
  
  render() {

    const faves = this.props.favorites.find(fave => {
      return fave.movie_id === this.props.movie.movie_id
    })
    let favoriteClass = faves ? 'favorite-movie favorite-btn' : 'favorite-btn';

    let loggedIn = this.props.user.name ? false : true;
    const posterPath = `https://image.tmdb.org/t/p/w500/${this.props.movie.poster_path}`
    return (
      <div className="movie-card">
        <button className={favoriteClass}
          disabled={loggedIn} 
          onClick={this.toggleFavorite}
          data-tooltip={loggedIn ? 'Must be signed in to favorite movies' : null}
        >
            Favorite
        </button>
        <article className="card-text">
          <h1 className="movie-title">{this.props.movie.title}</h1>
          <p> {this.props.movie.overview} </p>
        </article>
        <article className='poster'>
          <img src={posterPath} />
        </article>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  movies: state.movies,
  favorites: state.favorites
})

const mapDispatchToProps = (dispatch) => ({
  addFavorite: (favorite) => dispatch(addFavorite(favorite)),
  deleteFavoriteFromStore: (favorite) => dispatch(deleteFavoriteFromStore(favorite))
})

export default connect(mapStateToProps, mapDispatchToProps)(Card);