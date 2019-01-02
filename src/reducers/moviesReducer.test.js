import { isLoading, hasErrored, moviesReducer } from './moviesReducer'
import * as actions from '../actions'

describe('moviesReducer', () => {
	it('should return default state', () => {
		const expected = []
		const result = moviesReducer(undefined, {})
		expect(result).toEqual(expected)
	})

	it('should return the state with an array of movies', () => {
		const movies = [{movie: 'movie name'}]
		const result = moviesReducer(undefined, actions.fetchMoviesSuccess(movies))
		expect(result).toEqual(movies)
	})

	it('should return the state with an array of movies', () => {
		const movies = [{movie: 'movie name'}]
		const result = moviesReducer(undefined, actions.searchMovieSuccess(movies))
		expect(result).toEqual(movies)
	})

	describe('isLoading', () => {
		it('should return state with a true or false value', () => {
			const bool = true
			const result = isLoading(false, actions.isLoading(bool))
			expect(result).toEqual(bool)
		})
	})

	describe('hasErrored', () => {
		it('should return the state with an error message', () => {
			const message = 'error message'
			const result = hasErrored('', actions.hasErrored(message))
			expect(result).toEqual(message)
		})
	})
})