import React from 'react';
import './SearchBar.scss';


const SearchBar = () => {

  return (
    <div className="search-bar-div">
      <form>
        <input
          type="text"
          placeholder="Search the Database for your favorite movies"
          name="search"
          className="search-input"
        />
        <button>Search!</button>
      </form>
    </div>
  )
}

export default SearchBar