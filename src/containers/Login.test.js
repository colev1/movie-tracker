import React from 'react'
import { shallow } from 'enzyme'
import { Login, mapStateToProps, mapDispatchToProps } from './Login'
import { createUser } from '../thunks/createUser'
import { loginUser } from '../thunks/loginUser'
import { fetchFavorites } from '../thunks/fetchFavorites'

jest.mock('../thunks/createUser')
jest.mock('../thunks/loginUser')
jest.mock('../thunks/fetchFavorites')

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
				fetchFavorites = { jest.fn() }
				createUser = { jest.fn() }
				error = { 'error' }
				user = {{ name: 'Kylie', id: 1 }}
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
		wrapper.find('button').at(1).simulate('click')
		expect(wrapper.state().newUser).toEqual(true)  
	})

	it('should set reset state if sign up is clicked', () => {
		const spy = jest.spyOn(wrapper.instance(), 'resetState')
		wrapper.find('button').at(1).simulate('click')
		expect(spy).toHaveBeenCalled()
	})

	it('simulates text change in input box and updates state',() => {
		const mockEvent = { target: { value: 'Cody@Cole.com', name: 'email' }}
		const handleChangeSpy = jest.spyOn(wrapper.instance(), 'handleChange')
    
		wrapper.instance().forceUpdate()

		const input = wrapper.find('input').at(0)
		input.simulate('change', mockEvent)

		expect(handleChangeSpy).toHaveBeenCalled()
		expect(wrapper.state().email).toEqual('Cody@Cole.com')
	})

	it('should set an error message in state if props.error is true', () => {
		wrapper.setState({ errorMessage: false })
		wrapper.instance().handleServerResponse()
		expect(wrapper.instance().state.errorMessage).toEqual(true)
	})

	it('should set an error message in state if props.error is true', () => {
		wrapper.instance().handleServerResponse()
		expect(wrapper.instance().state.errorMessage).toEqual(true)
	})

	it('should call fetchFavorites if props.error is false', () => {
		wrapper = shallow(
			<Login
				loginUser = { jest.fn() }
				fetchFavorites = { jest.fn() }
				createUser = { jest.fn() }
				error = { '' }
				user = {{ name: 'Kylie', id: 1 }}
				history = { [] }
			/>
		)
		wrapper.instance().handleServerResponse()
		expect(wrapper.instance().props.fetchFavorites).toHaveBeenCalled()
	})


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

		it('should call dispatch with the correct params for fetchFavorites', () => {
			const uid = 2
			const actionToDispatch = fetchFavorites(uid)
			const result = mapDispatchToProps(mockDispatch)
			result.fetchFavorites(uid)
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