import React, { Component } from 'react';
import './SearchBar.scss';
import {searchMovies} from '../API';
import {addMovies} from '../actions';
import {connect} from 'react-redux';


class SearchBar extends Component {
  constructor() {
    super()
    this.state = {
      search: ''
    }
  }

  handleChange = (e) => {
    const {name, value} = e.target
    this.setState({
      [name]: value
    })
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    const foundMovies = await searchMovies(this.state.search)
    this.props.addMovies(foundMovies);
    this.resetState()
  }

  resetState = () => {
    this.setState({search: ''})
  }

  render() {
    return (
      <div className="search-bar-div">
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Search the Database for your favorite movies"
            name="search"
            className="search-input"
            onChange={this.handleChange}
          />
          <button>Search!</button>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  addMovies: (movies) => dispatch(addMovies(movies))
})

export default connect(null, mapDispatchToProps)(SearchBar);