import React from 'react';
import { shallow, mount } from 'enzyme';
import { MovieContainer, mapStateToProps } from './MovieContainer'
import Card from '../components/Card'
import { connect } from 'react-redux'


describe('MovieContainer', () => {
  let mockFavorites
  let mockMovies
  let wrapper

  beforeEach(() => {
    mockMovies = [{ title: 'movie1'}, {title: 'movie2'}, {title: 'movie3' }]
    mockFavorites = [{ title: 'movie1'}, {title: 'movie2' }]
     wrapper = shallow(
      <MovieContainer
        favorites={mockFavorites}
        movies={mockMovies}
        match={{path: '/'}}
      />
    )
  })

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should return three movies', () => {
    expect(wrapper.find(Card).length).toEqual(3)
  })

  it('should return three favorites', () => {
    wrapper = shallow(
      <MovieContainer
        favorites={ mockFavorites }
        movies={ mockMovies }
        match={{ path: '/favorites' }}
      />
    )
    
    expect(wrapper.find(Card).length).toEqual(2)
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