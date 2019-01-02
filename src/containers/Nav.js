import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux';
import { logout } from '../actions';
import { fetchMovies } from '../thunks/fetchMovies';
import PropTypes from 'prop-types';
import './Nav.scss';

export class Nav extends Component {
  constructor() {
    super()
    this.state = {
      pageNumber: 1
    }
  }
  
  incrementPage = async () => {
    this.setState({pageNumber: (this.state.pageNumber = this.state.pageNumber + 1)}, await this.nextPage());
  }

  decrementPage = async () => {
    if (this.state.pageNumber > 1) {
      this.setState({pageNumber: (this.state.pageNumber = this.state.pageNumber - 1)}, await this.nextPage())
    }
  }

  nextPage = () => {
    this.props.fetchMovies(this.state.pageNumber);
  }

  navToHomePage = () => {
    this.props.fetchMovies();
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
        { this.props.user.name ? <NavLink to='/'><button onClick={this.props.logout}>Sign Out</button></NavLink> : <NavLink to='/login'><button>Sign In</button></NavLink> }
        <button className="nav-btn" onClick={this.incrementPage}>Next Page <i className="fas fa-angle-right"></i></button>
      </header>
    )
  }
}

Nav.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string,
    password: PropTypes.string
  }),
  logout: PropTypes.func.isRequired,
  fetchMovies: PropTypes.func.isRequired
}

export const mapStateToProps = (state) => ({
  user: state.user
})

export const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
  fetchMovies: (page) => dispatch(fetchMovies(page))
})

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
