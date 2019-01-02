import React, { Component } from 'react';
import './SearchBar.scss';
import { searchMovies } from '../thunks/searchMovies';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


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
    this.props.searchMovies(this.state.search)
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
            value={this.state.search}
            className="search-input"
            onChange={this.handleChange}
          />
          <button>Search!</button>
        </form>
      </div>
    )
  }
}

SearchBar.propTypes = {
  searchMovies: PropTypes.func.isRequired
}

const mapDispatchToProps = (dispatch) => ({
  searchMovies: (search) => dispatch(searchMovies(search))
})

export default connect(null, mapDispatchToProps)(SearchBar);