import React, { Component } from 'react';
import * as API from '../API';
import './Login.scss';
import { loginUser, addFavorites } from '../actions';
import { connect } from 'react-redux';

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      verifiedPassword: '',
      newUser: false,
      name: '',
      errorMessage: false
    }
  }

  displayNewUserForm = () => {
    this.resetState()
    this.setState({
      newUser: true
    })
  }

  handleChange = (e) => {
    const {name, value} = e.target
    this.setState({
      [name]: value
    })
  }

  handleNewUserSubmit = async (e) => {
    e.preventDefault()
    const { name, password, email } = this.state;
    const user = {name, email, password}
    const userValid = await API.createUser(user)
    if (!userValid) {
      this.setState({
        errorMessage: true
      })
    } else {
      this.props.login({name: user.name, id: userValid})
      this.resetState();
      this.props.history.push('/');
    }
  }

  handleLoginSubmit = async (e) => {
    e.preventDefault()
    const email = this.state.email.toLowerCase();
    const {password} = this.state;
    const user = {password, email}
    const userObject = await API.loginUser(user)
    if (!userObject) {
      this.setState({errorMessage: true})
    } else {
      this.props.login({name: userObject.name, id: userObject.id});
      const favorites = await API.fetchFavorites(userObject.id);
      this.props.addFavorites(favorites);
      this.resetState();
      this.props.history.push('/');
    }
  }

  resetState = () => {
    this.setState({
      email: '',
      password: '',
      verifiedPassword: '',
      name: ''
    })
  }

  render() {
    const { email, password, verifiedPassword, name } = this.state;
    if (!this.state.newUser) {
      return (
        <section className="login-container">
          <h2>Welcome back!</h2>
          <div className={this.state.errorMessage ? 'show-error' : 'hide-error'}>E-Mail and Password do not match</div>
          <form onSubmit={this.handleLoginSubmit} className="login-form">
            <input
              type="email"
              placeholder="E-Mail"
              value={email}
              name="email"
              onChange={this.handleChange}
            />
            <input
              type="text"
              placeholder="Password"
              value={password}
              name="password"
              onChange={this.handleChange}
            />
            <button className="login-submit-btn">Submit</button>
          </form>
          <div className="signup-prompt">
            <label>Or are you new to Movie Tracker?</label>
            <button onClick={this.displayNewUserForm}>Sign Up!</button>
          </div>
        </section>
      )
    } else {
      return (
        <section className="login-container">
          <h2>Get ready to become a professional TRACKER!</h2>
          <div className={this.state.errorMessage ? 'show-error' : 'hide-error'}>E-Mail already exists</div>
          <form onSubmit={this.handleNewUserSubmit} className="login-form">
            <input
              type="text"
              placeholder="Name"
              value={name}
              name="name"
              onChange={this.handleChange}
            />
            <input
              type="text"
              placeholder="E-Mail"
              value={email}
              name="email"
              onChange={this.handleChange}
            />
            <input
              type="text"
              placeholder="Password"
              value={password}
              name="password"
              onChange={this.handleChange}
            />
            <button className="login-submit-btn">Submit</button>
          </form>
        </section>
      )
    }
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: (username) => dispatch(loginUser(username)),
  addFavorites: (favorites) => dispatch(addFavorites(favorites)) 
})

export default connect(null, mapDispatchToProps)(Login)