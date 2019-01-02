import React, { Component } from 'react';
import './App.css';
import Nav from './Nav';
import MovieContainer from './MovieContainer';
import Login from './Login';
import { Route, Switch, withRouter } from 'react-router-dom'
import { fetchMovies } from '../thunks/fetchMovies'
import { connect } from 'react-redux'


class App extends Component {

  async componentDidMount() {
    await this.props.fetchMovies()
  }

  render() {
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

const mapStateToProps = (state) => ({
  isLoading: state.isLoading,
  movies: state.movies,
  error: state.error
})


const mapDispatchToProps = (dispatch) => ({
  fetchMovies: () => dispatch(fetchMovies())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
