import React, { Component } from 'react';
import * as API from '../API';
import './Login.scss';

class Login extends Component {
  constructor(props) {
    super(props)
    console.log(props.history);
    this.state = {
      email: '',
      password: '',
      verifiedPassword: '',
      newUser: false,
      name: '',
      matchedUser: '',
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
    const email = this.state.email.toLowerCase();
    const {name, password} = this.state;
    const user = {name, password, email}
    const matchingUser = await API.createUser(user)
    console.log(matchingUser)
    if (matchingUser) {
      this.setState({
        errorMessage: true
      })
    } else {
      this.resetState();
      this.props.history.push('/');
    }
  }

  handleLoginSubmit = async (e) => {
    e.preventDefault()
    const email = this.state.email.toLowerCase();
    const {password} = this.state;
    const user = {password, email}
    const matchedUser = await API.loginUser(user)
    if (matchedUser === undefined) {
      this.setState({errorMessage: true})
    } else {
      this.setState({matchedUser})
      this.resetState()
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
        <section>
          <div className={this.state.errorMessage ? 'show-error' : 'hide-error'}>E-Mail and Password do not match</div>
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
          <div className={this.state.errorMessage ? 'show-error' : 'hide-error'}>E-Mail already exists</div>
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
              placeholder="Password"
              value={password}
              name="password"
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