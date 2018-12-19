import React, { Component } from 'react';
import * as API from '../API';

class Login extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      verifiedPassword: '',
      newUser: false,
      name: ''
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

  handleNewUserSubmit = (e) => {
    e.preventDefault()
    const email = this.state.email.toLowerCase();
    const {name, password} = this.state;
    const user = {name, password, email}
    API.createUser(user)
    this.resetState()
  }

  handleLoginSubmit = (e) => {
    e.preventDefault()
    const email = this.state.email.toLowerCase();
    const {password} = this.state;
    const user = {password, email}
    API.loginUser(user)
    this.resetState()
  }

  resetState = () => {
    this.setState({
      email: '',
      password: '',
      verifiedPassword: '',
      newUser: false,
      name: ''
    })
  }

  render() {
    const { email, password, verifiedPassword, name } = this.state;
    if (!this.state.newUser) {
      return (
        <section>
          <form onSubmit={this.handleLoginSubmit}>
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
            <button>Submit</button>
          </form>
          <label>New to Movie Tracker?</label>
          <button onClick={this.displayNewUserForm}>Sign Up!</button>
        </section>
      )
    } else {
      return (
        <section>
          <form onSubmit={this.handleNewUserSubmit}>
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
              placeholder="Desired Password"
              value={password}
              name="password"
              onChange={this.handleChange}
            />
            <input
              type="text"
              placeholder="Verify Password"
              value={verifiedPassword}
              name="verifiedPassword"
              onChange={this.handleChange}
            />
            <button>Submit</button>
          </form>
        </section>
      )
    }
  }
}


export default Login;