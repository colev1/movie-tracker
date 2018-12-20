import React, { Component } from 'react';
import '../App.css';
import Nav from './Nav';
import MovieContainer from './MovieContainer';
import Login from './Login';
import { Route, Switch, withRouter } from 'react-router-dom'
import { fetchMovies } from '../API'
import apiKey from '../apiKey';
import { connect } from 'react-redux'
import { addMovies } from '../actions'


class App extends Component {
  constructor(props) {
    super(props)
  }

  async componentDidMount() {
    const movies = await fetchMovies(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`)
    this.props.addMovies(movies)
  }

  render() {
    console.log(this.props)
    return (
      <div className="App">
        <Nav />
        <Switch>
          <Route exact path='/' component={ MovieContainer } />
          <Route path='/login' component={ Login } />
          <Route path='/favorites' component={ MovieContainer } />
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addMovies: (movies) => dispatch(addMovies(movies))
})

export default withRouter(connect(null, mapDispatchToProps)(App))
