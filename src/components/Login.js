import React, { Component } from 'react';

class Login extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      verifiedPassword: '',
      newUser: false
    }
  }

  displayNewUserForm = () => {
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

  render() {
    const { email, password, verifiedPassword } = this.state;
    if (!this.state.newUser) {
      return (
        <section>
          <form>
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
          <form>
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