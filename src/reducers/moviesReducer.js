export const isLoading = (state = false, action) => {
	switch(action.type) {
	case 'IS_LOADING':
		return action.isLoading
	default:
		return state
	}
}

export const hasErrored = (state = '', action) => {
	switch(action.type) {
	case 'HAS_ERRORED':
		return action.message
	default:
		return state
	}
}

export const moviesReducer = (state = [], action) => {
	switch(action.type) {
	case 'FETCH_MOVIES_SUCCESS':
		return action.movies
	case 'SEARCH_MOVIES_SUCCESS':
		return action.movies
	default:
		return state
	}
}