import React, { Component } from 'react';
import './Card.scss'
import {connect} from 'react-redux';
import {postFavorite} from '../API';
import { addFavorite } from '../actions'


class Card extends Component {
  constructor(props) {
    super(props)
  }
  
  handleAddFavorite = () => {
    postFavorite(this.props.movie, this.props.user.id);
    this.props.addFavorite(this.props.movie);
  }

  render() {
    let loggedIn = this.props.user ? false : true;
    const posterPath = `https://image.tmdb.org/t/p/w500/${this.props.movie.poster_path}`
    console.log('cards props:', this.props)
    return (
      <div className="movie-card">
        <button className="favorite-btn" 
          disabled={loggedIn} 
          onClick={this.handleAddFavorite}
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
  movies: state.movies
})

const mapDispatchToProps = (dispatch) => ({
  addFavorite: (favorite) => dispatch(addFavorite(favorite))
})

export default connect(mapStateToProps, mapDispatchToProps)(Card);