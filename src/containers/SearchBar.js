import React, { Component } from 'react';
import './SearchBar.scss';
import { searchMovies } from '../API';
import { fetchMovies } from '../thunks/fetchMovies';
import { connect } from 'react-redux';


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
    // this.props.fetchMovies(foundMovies);
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
            placeholder="Search the Database by any keyword!"
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
  addMovies: (movies) => dispatch(fetchMovies(movies))
})

export default connect(null, mapDispatchToProps)(SearchBar);