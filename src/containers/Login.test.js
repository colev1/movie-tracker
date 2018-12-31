import React from 'react';
import { shallow } from 'enzyme';
import { Login, mapStateToProps, mapDispatchToProps } from './Login'
import * as API from '../API';
import * as actions from '../actions'
import { createUser } from '../thunks/createUser'
import { loginUser } from '../thunks/loginUser'

jest.mock('../thunks/createUser')
jest.mock('../thunks/loginUser')

describe('Login', () => {
  let mockFavorites
  let mockUser
  let wrapper

  beforeEach(() => {
    mockFavorites = [{title: 'movie1', movie_id: 1}, {title: 'movie2', movie_id: 2}]
    mockUser = { name: 'Taylor', id: 1 }
    wrapper = shallow(
      <Login
        loginUser = { jest.fn() }
        addFavorites = { jest.fn() }
        createUser = { jest.fn() }
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

  it('simulates text change in input box and updates state',() => {
    const mockEvent = { target: { value: 'Cody@Cole.com', name: 'email' }}
    const handleChangeSpy = jest.spyOn(wrapper.instance(), 'handleChange')
    
    wrapper.instance().forceUpdate();

    const input = wrapper.find('input').at(0);
    input.simulate('change', mockEvent);

    expect(handleChangeSpy).toHaveBeenCalled()
    expect(wrapper.state().email).toEqual('Cody@Cole.com')
  });

  describe('mapStateToProps', () => {
    it('should return an object with a user', () => {
      const mockState = {
        user: { name: 'Cole', id: 1 },
      }
      const expected = { user: mockState.user }
      const result = mapStateToProps(mockState)
      expect(result).toEqual(expected)
    })
  })

  describe('mapDispatchToProps', () => {
    let mockDispatch

    beforeEach(() => {
      mockDispatch = jest.fn()
    })
    
    it('should call dispatch with the correct params for login', () => {
      const user = { name: 'Cole' }
      const actionToDispatch = loginUser(user)
      const result = mapDispatchToProps(mockDispatch)
      result.loginUser(user)
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    })

    it('should call dispatch with the correct params for addFavorites', () => {
      const favorites = [{title: 'movie1', movie_id: 1}, {title: 'movie2', movie_id: 2}]
      const actionToDispatch = actions.addFavorites(favorites)
      const result = mapDispatchToProps(mockDispatch)
      result.addFavorites(favorites)
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    })

    it('should call dispatch with the correct params for createUser', () => {
      const user = { name: 'Cole' }
      const actionToDispatch = createUser(user)
      const result = mapDispatchToProps(mockDispatch)
      result.createUser(user)
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    })
  })
})