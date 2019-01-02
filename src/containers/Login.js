import React, { Component } from 'react';
import './Login.scss';
import {fetchFavorites} from '../thunks/fetchFavorites';
import { connect } from 'react-redux';
import { createUser } from '../thunks/createUser';
import { loginUser } from '../thunks/loginUser';

export class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
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
    this.props.createUser(user)
    this.resetState();
    this.props.history.push('/');
  }

  handleLoginSubmit = async (e) => {
    e.preventDefault()
    const email = this.state.email.toLowerCase()
    const {password} = this.state
    const user = {password, email}
    await this.props.loginUser(user)
    // const favorites = await this.props.fetchFavorites(this.props.user.id);

    // this.props.addFavorites(favorites);

    this.props.fetchFavorites(this.props.user.id);
    this.resetState();
    this.props.history.push('/');
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
    const { email, password, name } = this.state;
    let disableSubmit = false;
    if (!email || !password) {
      disableSubmit = true;
    } 
    if (!this.state.newUser) {
      return (
        <section className="login-container">
          <h2>Welcome back!</h2>
          <div className={this.state.errorMessage ? 'show-error' : 'hide-error'}>E-Mail and Password do not match</div>
          <form onSubmit={this.handleLoginSubmit} className="login-form">
            <input
              type="text"
              placeholder="E-Mail"
              value={email}
              name="email"
              onChange={this.handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              name="password"
              onChange={this.handleChange}
            />
            <button className="login-submit-btn" disabled={disableSubmit}
            >Submit</button>
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
              type="email"
              placeholder="E-Mail"
              value={email}
              name="email"
              onChange={this.handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              name="password"
              onChange={this.handleChange}
            />
            <button 
              className="login-submit-btn"
              disabled={disableSubmit}>
            Submit
            </button>
          </form>
        </section>
      )
    }
  }
}

export const mapStateToProps = (state) => ({
  user: state.user
})

export const mapDispatchToProps = (dispatch) => ({
  loginUser: (user) => dispatch(loginUser(user)),
  createUser: (user) => dispatch(createUser(user)),
  fetchFavorites: (uid) => dispatch(fetchFavorites(uid)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)