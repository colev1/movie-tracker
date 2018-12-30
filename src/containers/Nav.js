import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux';
import { logout } from '../actions'
import { fetchMovies } from '../API'
import { addMovies } from '../actions'
import './Nav.scss';


class Nav extends Component {
  constructor() {
    super()
    this.state = {
      pageNumber: 1
    }
  }
  
  incrementPage = async () => {
    this.setState({pageNumber: (this.state.pageNumber = this.state.pageNumber + 1)}, await this.nextPage())
  }

  decrementPage = async () => {
    if (this.state.pageNumber > 1) {
      this.setState({pageNumber: (this.state.pageNumber = this.state.pageNumber - 1)}, await this.nextPage())
    }
  }

  nextPage = async () => {
    let nextPageOfMovies = await fetchMovies(this.state.pageNumber)
    this.props.addMovies(nextPageOfMovies);
  }

  navToHomePage = async () => {
    const movies = await fetchMovies()
    this.props.addMovies(movies);
  }


  render() {
    return (
      <header>
        <h4> 
          {this.props.user.name ? `Welcome Back ${this.props.user.name}!` : null}
        </h4>
        <button className="nav-btn"
          onClick={this.decrementPage}><i className="fas fa-angle-left"></i> Previous Page</button>
        <NavLink to='/favorites'><button>My Favorites</button></NavLink>
        <NavLink to='/' onClick={this.navToHomePage}>
          <h1 className="logo">Movie <i className="fas fa-film"></i> Tracker</h1>
        </NavLink>
        { this.props.user.name ? <NavLink to='/'><button onClick={this.props.logout}>Sign Out</button></NavLink> : <NavLink to='/login'><button>Login/Signup</button></NavLink> }
        <button className="nav-btn" onClick={this.incrementPage}>Next Page <i className="fas fa-angle-right"></i></button>
      </header>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user
})

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
  addMovies: (movies) => dispatch(addMovies(movies))
})

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
