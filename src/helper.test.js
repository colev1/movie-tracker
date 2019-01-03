
import {cleanMovies, sqlSearchString } from './helper'

describe('helper files', () => {
	it('has method clean movies that takes in an array of movie and returns an array of cleaned movies', () => {
		const mockMovie = { 
			'popularity': 626.447,
			'id': 297802,
			'video': false,
			'vote_count': 1390,
			'vote_average': 6.9,
			'title': 'Aquaman',
			'release_date': '2018-12-21',
			'original_language': 'en',
			'original_title': 'Aquaman',
			'genre_ids': [
				28,
				14,
				878,
				12
			],
			'backdrop_path': '/5A2bMlLfJrAfX9bqAibOL2gCruF.jpg',
			'adult': false,
			'overview': 'Arthur Curry learns that he is the heir to the underwater kingdom of Atlantis, and must step forward to lead his people and be a hero to the world.',
			'poster_path': '/i2dF9UxOeb77CAJrOflj0RpqJRF.jpg'
		}
    
		const cleanedMovie = {
			movie_id: 297802,
			title: 'Aquaman',
			backdrop_path: '/5A2bMlLfJrAfX9bqAibOL2gCruF.jpg',
			poster_path: '/i2dF9UxOeb77CAJrOflj0RpqJRF.jpg',
			overview: 'Arthur Curry learns that he is the heir to the underwater kingdom of Atlantis, and must step forward to lead his people and be a hero to the world.',
			original_language: 'en',
			popularity: 626.447,
			genre_ids: [
				28,
				14,
				878,
				12
			],
			release_date: '2018-12-21',
			vote_average:  6.9
		}

		let result = cleanMovies([mockMovie, mockMovie])
		let expected = [cleanedMovie, cleanedMovie]
		expect(result).toEqual(expected)
	})
  
	it('has method SQL search string that returns a cleaned version of searched string', () => {
		let mockSearch = 'Harry potter'
		let result = sqlSearchString(mockSearch)
		let expected = 'Harry%20potter'
		expect(result).toEqual(expected)
	})
})