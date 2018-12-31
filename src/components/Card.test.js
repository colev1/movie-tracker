import React from 'react';
import { shallow } from 'enzyme';
import { Card, mapStateToProps, mapDispatchToProps } from './Card'
// import { connect } from 'react-redux'
import * as API from '../API';
import * as actions from '../actions'


describe('Card', () => {
  let wrapper
  let mockMovie
  let mockFavorites
  let mockUser

  beforeEach(() => {
    mockMovie = {title: 'movie1', movie_id: 1}
    mockFavorites = [{title: 'movie1', movie_id: 1}, {title: 'movie2', movie_id: 2}]
    mockUser = { name: 'Taylor', id: 1 }
    wrapper = shallow(
      <Card
        movie={ mockMovie }
        key={ mockMovie.title }
        favorites= { mockFavorites }
        user={ mockUser }
        addFavorite = { jest.fn() }
        deleteFavoriteFromStore = { jest.fn() }
      />
    )
  })

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should call postFavorite if there is no match', () => {
    let mockMovie = {title: 'movie1', movie_id: 3}
    let wrapper = shallow(
      <Card
        movie={ mockMovie }
        key={ mockMovie.title }
        favorites= { mockFavorites }
        user={ mockUser }
        addFavorite = { jest.fn() }
        deleteFavoriteFromStore = { jest.fn() }
      />
    )
    API.postFavorite = jest.fn()
    const button = wrapper.find('button');
    const handleSpy = jest.spyOn(wrapper.instance(), 'toggleFavorite')
    button.simulate('click');
    expect(API.postFavorite).toHaveBeenCalled()
  })

  it('should call deleteFavorite if there is a match', () => {
    API.deleteFavorite = jest.fn()
    const button = wrapper.find('button');
    const handleSpy = jest.spyOn(wrapper.instance(), 'toggleFavorite')
    button.simulate('click');
    expect(API.deleteFavorite).toHaveBeenCalled()
  })

  it('should not display tooltip text if there is a user in store', () => {
    expect(wrapper.find('button').props()["data-tooltip"]).toBe(null)
  })

   it('should display "must be signed in" if there is no user in store', () => {
    let tooltipText = 'Must be signed in to favorite movies'
    let wrapper = shallow(
      <Card
        movie={ mockMovie }
        key={ mockMovie.title }
        favorites= { mockFavorites }
        user={{ name: null }}
        addFavorite = { jest.fn() }
        deleteFavoriteFromStore = { jest.fn() }
      />
    )
    expect(wrapper.find('button').props()["data-tooltip"]).toBe(tooltipText)
  })

  describe('mapStateToProps', () => {
    it('should return an object with a user and favorites', () => {
      const mockState = {
        user: mockUser,
        favorites: mockFavorites
      }
      const expected = { user: mockState.user, favorites: mockState.favorites }
      const result = mapStateToProps(mockState)
      expect(result).toEqual(expected)
    })
  })

  describe('mapDispatchToProps', () => {
    let favorite
    let mockDispatch

    beforeEach(() => {
      favorite = mockMovie
      mockDispatch = jest.fn()
    })
    
    it('should call dispatch with the correct params', () => {
      const actionToDispatch = actions.addFavorite(favorite)
      const result = mapDispatchToProps(mockDispatch)
      result.addFavorite(favorite)
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    })

    it('should call dispatch with the correct params', () => {
      const actionToDispatch = actions.deleteFavoriteFromStore(favorite)
      const result = mapDispatchToProps(mockDispatch)
      result.deleteFavoriteFromStore(favorite)
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    })
  })
})