import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'


const Nav = () => {
  return (
    <header>
      <NavLink to='/favorites'>Favorites</NavLink>
      <NavLink to='/'><h1>Movie Tracker</h1></NavLink>
      <NavLink to='/login'>Login/Signup</NavLink>
    </header>
  )
}

export default Nav;