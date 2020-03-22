import React, { Component } from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { login } from './UserFunctions'
import './Login.css'

class Login extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      errors: {}
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  onSubmit(e) {
    e.preventDefault()

    const user = {
      email: this.state.email,
      password: this.state.password
    }

    login(user).then(res => {
      console.log(res)
      if (res) {
        // this.props.history.push(`/profile`)
        if (res.error) {
          let name = this.state.errors
          name['failed'] = "* Either Email or password is wrong"
          this.setState({ errors: name })
          localStorage.removeItem('usertoken')
        }
        else {
          let name = this.state.errors
          name['failed'] = ""
          this.setState({ errors: name })
          this.props.history.push(`/profile`)
        }
      }
    })
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form noValidate onSubmit={this.onSubmit}>
              <Card class="card">
                <CardContent>
                  <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                  <div className="form-group">

                    <label htmlFor="email">Email address</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      placeholder="Enter email"
                      value={this.state.email}
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      placeholder="Password"
                      value={this.state.password}
                      onChange={this.onChange}
                    />
                  </div>
                  {this.state.errors['failed']}
                  <button
                    type="submit"
                    className="btn btn-lg btn-primary btn-block"
                    style={{
                      backgroundColor: "#418CCB",
                      padding: "18px 36px"
                  }}
                  >
                    Sign in
                  </button>
                </CardContent>
              </Card>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login