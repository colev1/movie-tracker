import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux';


const Nav = (props) => {
  console.log(props)
  return (
    <header>
      <h4> 
        {props.username}
      </h4>
      <NavLink to='/favorites'>Favorites</NavLink>
      <NavLink to='/'><h1>Movie Tracker</h1></NavLink>
      <NavLink to='/login'>Login/Signup</NavLink>
    </header>
  )
}

const mapStateToProps = (state) => ({
  username: state.username
})

export default connect(mapStateToProps)(Nav);