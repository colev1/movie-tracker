import React, { Component } from 'react';
import '../App.css';
import Nav from './Nav';
import MovieContainer from './MovieContainer';
import Login from './Login';
import { Route, Switch } from 'react-router-dom'
import {fetchMovies} from '../API'
import apiKey from '../apiKey';


class App extends Component {
  constructor() {
    super()
    this.state = {
      movies: []
    }
  }

  async componentDidMount() {
    const movies = await fetchMovies(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`)
    this.setState({ movies })
  }

  render() {
    return (
      <div className="App">
        <Nav />
        <Switch>
          <Route exact path='/' render={(props) => <MovieContainer movies={ this.state.movies } /> }/>
          <Route exact path='/login' component={ Login } />
          <Route exact path='/favorites' component={ MovieContainer } />
        </Switch>
      </div>
    );
  }
}

export default App;
