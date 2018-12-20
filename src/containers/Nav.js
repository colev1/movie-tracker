import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux';
import { logout } from '../actions'
import './Nav.scss';


const Nav = (props) => {
  return (
    <header>
      <h4> 
        {props.user.name}
      </h4>
      <NavLink to='/favorites'><button>My Favorites</button></NavLink>
      <NavLink to='/'><h1 className="logo">Movie <i class="fas fa-film"></i> Tracker</h1></NavLink>
      { props.user.name ? <NavLink to='/'><button onClick={props.logout}>Sign Out</button></NavLink> : <NavLink to='/login'><button>Login/Signup</button></NavLink> }
    </header>
  )
}

const mapStateToProps = (state) => ({
  user: state.user
})

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
