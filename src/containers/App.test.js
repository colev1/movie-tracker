import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from '../reducers'

const store = createStore(rootReducer)

it('renders without crashing', () => {
	const router = (
		<Provider store={store}>
			<BrowserRouter>
				<App/>
			</BrowserRouter>
		</Provider>
	)
	const div = document.createElement('div')
	ReactDOM.render(router, div)
	ReactDOM.unmountComponentAtNode(div)
})
