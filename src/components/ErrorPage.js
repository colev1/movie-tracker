import React from 'react'
import '../containers/MovieContainer.scss'

const ErrorPage = () => {

	return (
		<h1 className="no-movies movie-container">
      The page you requested cannot be found. Please check your address and try again.
		</h1>
	)
}

export default ErrorPage