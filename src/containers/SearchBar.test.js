import React from 'react'
import { shallow } from 'enzyme'
import { SearchBar, mapDispatchToProps } from './SearchBar'
import { searchMovies } from '../thunks/searchMovies'

jest.mock('../thunks/searchMovies')

describe('search bar', () => {
	let wrapper
	let mockSearchMovies
	let mockSearch
	let mockMovies

	beforeEach(() => {
		mockMovies = [{ title: 'movie1', movie_id: 1}, {title: 'movie2', movie_id: 2}, {title: 'movie3', movie_id: 3 }]
		mockSearchMovies = jest.fn()

		wrapper = shallow( 
			<SearchBar 
				searchMovies={mockSearchMovies}
			/> )
		mockSearch = 'harry potter'
	})

	it('should match the snapshot', () => {
		expect(wrapper).toMatchSnapshot()
	})

	it.skip('should call handle submit on button click', () => {
		const spy = jest.spyOn(wrapper.instance(), 'handleSubmit')
		wrapper.find('.search-btn').simulate('click')
		expect(spy).toHaveBeenCalled()
	})

	it('should set state of search when search value is typed in', () => {
		const mockEvent = {
			target: {
				name: 'search',
				value: 'harry potter'
			}
		}
		const handleChangeSpy = jest.spyOn(wrapper.instance(), 'handleChange')
		wrapper.instance().forceUpdate()
		const input = wrapper.find('input').at(0)
		input.simulate('change', mockEvent)
		expect(handleChangeSpy).toHaveBeenCalled()
		expect(wrapper.state().search).toEqual('harry potter')
	})

	it.skip('should reset state after submit button is clicked', ()=> {
		const spy = jest.spyOn(wrapper.instance(), 'resetState')
		wrapper.find('.search-btn').simulate('click')
		expect(spy).toHaveBeenCalled()
	})
})

describe('map dispatch to props', ()=> {
	let mockDispatch
	let mockSearch

	beforeEach(() => {
		mockDispatch = jest.fn()
		mockSearch = 'harry potter'
	})
	it('should call dispatch with the correct parameters for search movies', () => {
		const actionToDispatch = searchMovies(mockSearch)
		const result = mapDispatchToProps(mockDispatch)
		result.searchMovies(mockSearch)
		expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
	})
})
