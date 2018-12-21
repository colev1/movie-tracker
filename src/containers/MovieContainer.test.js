import React from 'react';
import { shallow } from 'enzyme';
import MovieContainer from './MovieContainer'
import { mapStateToProps } from './MovieContainer'
import Card from '../components/Card'
import { connect } from 'react-redux'


describe('MovieContainer', () => {
  let wrapper
  let mockFavorites
  let mockMovies

  beforeEach(() => {
    mockMovies = [{title: 'movie1'}, {title: 'movie2'},{title: 'movie3'}]
    mockFavorites = [{title: 'movie1'}, {title: 'movie2'}]
    wrapper = shallow(
      <MovieContainer
        favorites={mockFavorites}
        movies={mockMovies}
        match={{path: '/favorites'}}
      />
    )
  })

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  describe('mapStateToProps', () => {
    it('should return an object with a movies and favorites array', () => {
      const mockState = {
        movies: mockMovies,
        favorites: mockFavorites
      }
      const expected = { movies: mockState.movies, favorites: mockState.favorites }
      const result = mapStateToProps(mockState)
      expect(result).toEqual(expected)
    })
  })
})