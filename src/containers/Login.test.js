import React from 'react';
import { shallow } from 'enzyme';
import { Login, mapDispatchToProps } from './Login'
import * as API from '../API';
import * as actions from '../actions'

describe('Login', () => {
  let mockFavorites
  let mockUser
  let wrapper

  beforeEach(() => {
    mockFavorites = [{title: 'movie1', movie_id: 1}, {title: 'movie2', movie_id: 2}]
    mockUser = { name: 'Taylor', id: 1 }
    wrapper = shallow(
      <Login
        login = { jest.fn() }
        addFavorites = { jest.fn() }
      />
    )
  })

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should set newUser to true if sign up is clicked', () => {
    const initialState = {
      email: '',
      password: '',
      verifiedPassword: '',
      newUser: false,
      name: '',
      errorMessage: false
    }

    wrapper.setState(initialState)
    const button = wrapper.find('button').at(1).simulate('click')
    expect(wrapper.state().newUser).toEqual(true);  
  })

  it('should set reset state if sign up is clicked', () => {
    const spy = jest.spyOn(wrapper.instance(), 'resetState')
    const button = wrapper.find('button').at(1).simulate('click')
    expect(spy).toHaveBeenCalled()
  })



  describe('mapDispatchToProps', () => {
    let mockDispatch

    beforeEach(() => {
      mockDispatch = jest.fn()
    })
    
    it('should call dispatch with the correct params for login', () => {
      const user = { name: 'Cole' }
      const actionToDispatch = actions.loginUser(user)
      const result = mapDispatchToProps(mockDispatch)
      result.login(user)
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    })

    it('should call dispatch with the correct params for addFavorites', () => {
      const favorites = [{title: 'movie1', movie_id: 1}, {title: 'movie2', movie_id: 2}]
      const actionToDispatch = actions.addFavorites(favorites)
      const result = mapDispatchToProps(mockDispatch)
      result.addFavorites(favorites)
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    })
  })
})