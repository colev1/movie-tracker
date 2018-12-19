import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux';
import { logout } from '../actions'

const Nav = (props) => {
  console.log(props)
  return (
    <header>
      <h4> 
        {props.user}
      </h4>
      <NavLink to='/favorites'>Favorites</NavLink>
      <NavLink to='/'><h1>Movie Tracker</h1></NavLink>
      { props.user ? <NavLink to='/'><button onClick={props.logout}>Sign Out</button></NavLink> : <NavLink to='/login'>Login/Signup</NavLink> }
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