import React from 'react'
import { shallow } from 'enzyme'
import { Nav, mapStateToProps, mapDispatchToProps } from './Nav'
import * as actions from '../actions'
import * as thunks from '../thunks/fetchMovies'

jest.mock('../thunks/fetchMovies')


describe('Nav', () => {
	let wrapper
	let mockMovies

	beforeEach(() => {
		mockMovies = [{ title: 'movie1'}, {title: 'movie2'}, {title: 'movie3' }]
		wrapper = shallow(
			<Nav
				user={{name: 'Cole', id: 1}}
				logout={jest.fn()}
				fetchMovies={jest.fn()}
			/>
		)
	})

	it('should match the snapshot', () => {
		expect(wrapper).toMatchSnapshot()
	})

	it('should welcome the user if logged in', () => {
		expect(wrapper.find('h4').text()).toEqual('Welcome Back Cole!')
	})

	it('should display nothing if the user is not logged in', () => {
		wrapper = shallow(
			<Nav
				user={{name: null, id: null}}
				logout={jest.fn()}
				fetchMovies={jest.fn()}
			/>
		)
		expect(wrapper.find('h4').text()).toEqual('')
	})

	it('should increment the page', () => {
		wrapper.setState({ pageNumber: 1})
		wrapper.instance().incrementPage()
		expect(wrapper.instance().state.pageNumber).toEqual(2)
	})

	it('should decrement the page if greater than one', () => {
		wrapper.setState({ pageNumber: 4})
		wrapper.instance().decrementPage()
		expect(wrapper.instance().state.pageNumber).toEqual(3)
	})

	it('should not decrement the page if less than two', () => {
		wrapper.setState({ pageNumber: 1})
		wrapper.instance().decrementPage()
		expect(wrapper.instance().state.pageNumber).toEqual(1)
	})

	it('should call fetchMovies when navigating home', () => {
		wrapper.instance().navToHomePage()
		expect(wrapper.instance().props.fetchMovies).toHaveBeenCalled()
	})

	describe ('mapStateToProps', () => {
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
    
		it('should call dispatch with the correct params for logout', () => {
			const actionToDispatch = actions.logout()
			const result = mapDispatchToProps(mockDispatch)
			result.logout()
			expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
		})

		it('should call dispatch with the correct params for fetchMovies', () => {
			const page = 2
			const actionToDispatch = thunks.fetchMovies(page)
			const result = mapDispatchToProps(mockDispatch)
			result.fetchMovies(page)
			expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
		})
	})
})