import React from 'react'
import { shallow } from 'enzyme'
import { MovieContainer, mapStateToProps } from './MovieContainer'
import Card from '../components/Card'

describe('MovieContainer', () => {
	let mockFavorites
	let mockMovies
	let wrapper

	beforeEach(() => {
		mockMovies = [{ title: 'movie1', movie_id: 1}, {title: 'movie2', movie_id: 2}, {title: 'movie3', movie_id: 3 }]
		mockFavorites = [{ title: 'movie1', movie_id: 1}, {title: 'movie2', movie_id: 2 }]
		wrapper = shallow(
			<MovieContainer
				favorites = { mockFavorites }
				movies = { mockMovies }
				match = {{ path: '/' }}
				isLoading = { false }
				error = { '' }
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

	it('should return loading if props.isLoading is true', () => {
		wrapper = shallow(
			<MovieContainer
				favorites = { mockFavorites }
				movies = { mockMovies }
				match = {{ path: '/' }}
				isLoading = { true }
				error = { '' }
			/>
		)
		expect(wrapper.find('div').hasClass('loading')).toEqual(true)
	})

	it('should return a message that you have no movies if search is not valid', () => {
		wrapper = shallow(
			<MovieContainer
				favorites = { mockFavorites }
				movies = { [] }
				match = {{ path: '/' }}
				isLoading = { false }
				error = { '' }
			/>
		)
		expect(wrapper.find('h1').at(1).hasClass('no-movies movie-container')).toEqual(true)
	})

	it('should return a message that you have no favorites if none', () => {
		wrapper = shallow(
			<MovieContainer
				favorites = { [] }
				movies = { mockMovies }
				match = {{ path: '/favorites' }}
				isLoading = { false }
				error = { '' }
			/>
		)
		expect(wrapper.find('h1').at(0).hasClass('no-movies movie-container')).toEqual(true)
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