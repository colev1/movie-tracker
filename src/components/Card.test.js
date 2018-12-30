import React from 'react';
import { shallow } from 'enzyme';
import { Card, mapStateToProps, mapDispatchToProps } from './Card'
import { connect } from 'react-redux'
import * as actions from '../actions'

describe('Card', () => {
  let wrapper
  let mockMovie
  let mockFavorites
  let mockUser

  beforeEach(() => {
    mockMovie = {title: 'movie1'}
    mockFavorites = [{title: 'movie1'}, {title: 'movie2'}]
    mockUser = { name: 'Taylor', id: 1 }
    wrapper = shallow(
      <Card
        movie={ mockMovie }
        key={'movie1'}
        favorites= { mockFavorites }
        user={ mockUser }
      />
    )
  })

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
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
    it('should call dispatch with the correct params', () => {
      const favorite = mockMovie
      const mockDispatch = jest.fn()
      const actionToDispatch = actions.addFavorite(favorite)
      const result = mapDispatchToProps(mockDispatch)
      result.addFavorite(favorite)
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    })
  })
})