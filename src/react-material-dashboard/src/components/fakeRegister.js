import React, { Component } from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { register } from './UserFunctions'

var lablist
var floorlist
class Register extends Component {
  constructor() {
    super()
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      position: '',
      floor: -1,
      lab: 'ALL LABS',
      list:[],
      errors: {}
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    
  }

  onChange(e) {
    console.log(e.target.name+" "+e.target.value)
    if(e.target.value=="admin")
    {
      this.setState({floor:-1})
    }
    this.setState({ [e.target.name]: e.target.value })
  }
  onSubmit(e) {
    e.preventDefault()
    var newlist=[]
    
    const newUser = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      password: this.state.password,
      position: this.state.position,
      lab: this.state.lab,
      floor: this.state.floor,
      list:newlist
    }
    console.log(newUser)
    register(newUser).then(res => {

      this.props.history.push(`/login`)
    })
  }

  render() {
    console.log("position"    )
    console.log(this.state.position)
    console.log(this.state.floor)
    if(this.state.floor==0)
    {
      lablist=
      <div className="form-group">
      <label htmlFor="lab">Lab</label>
      <Select
        type="lab"
        className="form-control"
        name="lab"
        placeholder="Choose Lab"
        value={this.state.lab}
        onChange={this.onChange}
      >
      <MenuItem value="0">Office and Faculty Meeting Hall</MenuItem>
      <MenuItem value="1">Exhibition Hall</MenuItem>
        
      </Select>
    </div>
    }
    else if(this.state.floor==1)
    {
      lablist=
      <div className="form-group">
      <label htmlFor="lab">Lab</label>
      <Select
        type="lab"
        className="form-control"
        name="lab"
        placeholder="Choose Lab"
        value={this.state.lab}
        onChange={this.onChange}
      >
      <MenuItem value="0">WING - I</MenuItem>
      <MenuItem value="1">WING - II</MenuItem>
      <MenuItem value="2">WING - III</MenuItem>
      <MenuItem value="3">WING - IV</MenuItem>
        
      </Select>
    </div>
    }
    else if(this.state.floor==2)
    {
        lablist=
        <div className="form-group">
        <label htmlFor="lab">Lab</label>
        <Select
          type="lab"
          className="form-control"
          name="lab"
          placeholder="Choose Lab"
          value={this.state.lab}
          onChange={this.onChange}
        >
        <MenuItem value="0">WING - I</MenuItem>
        <MenuItem value="1">WING - II</MenuItem>
        <MenuItem value="2">WING - III</MenuItem>
        <MenuItem value="3">WING - IV</MenuItem>
        </Select>
      </div> 
    }
    
    else if(this.state.floor==3)
    {
        lablist=
        <div className="form-group">
        <label htmlFor="lab">Lab</label>
        <Select
          type="lab"
          className="form-control"
          name="lab"
          placeholder="Choose Lab"
          value={this.state.lab}
          onChange={this.onChange}
        >
        <MenuItem value="0">WING - I</MenuItem>
        <MenuItem value="1">WING - II</MenuItem>
        <MenuItem value="2">WING - III</MenuItem>
        <MenuItem value="3">WING - IV</MenuItem>
        </Select>
      </div> 
    }
    else 
    {
        lablist=
        <></> 
    }

    if(this.state.position=="space")
    {
      console.log("position scond")
      console.log(this.state.position)
      floorlist=
      <div className="form-group">
      <label htmlFor="floor">Floor</label>
      <Select
        type="floor"
        className="form-control"
        name="floor"
        placeholder="Choose Floor"
        value={this.state.floor}
        onChange={this.onChange}
      >
        <MenuItem value="0">Ground Floor</MenuItem>
        <MenuItem value="1">1st Floor</MenuItem>
        <MenuItem value="2">2nd Floor</MenuItem>
        <MenuItem value="3">3rd Floor</MenuItem>
      </Select>
    </div>
    }
    else{
      floorlist=
      <div></div>
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <Card class="card">
              <CardContent>
                <form noValidate onSubmit={this.onSubmit}>
                  <h1 className="h3 mb-3 font-weight-normal">Register</h1>
                  <div className="form-group">
                    <label htmlFor="name">First name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="first_name"
                      placeholder="Enter your first name"
                      value={this.state.first_name}
                      onChange={this.onChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="name">Last name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="last_name"
                      placeholder="Enter your last name"
                      value={this.state.last_name}
                      onChange={this.onChange}
                    />
                  </div>

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
                      placeholder="Enter Password"
                      value={this.state.password}
                      onChange={this.onChange}
                    />
                  </div>

                  {/* <div className="form-group">
                    <label htmlFor="position">Position</label>
                    <input
                      type="position"
                      className="form-control"
                      name="position"
                      placeholder="Choose Position"
                      value={this.state.position}
                      onChange={this.onChange}
                    />
                  </div> */}

                  <div className="form-group">
                    <label htmlFor="position">Position</label>
                    <Select
                      type="text"
                      className="form-control"
                      name="position"
                      placeholder="Choose Position"
                      value={this.state.position}
                      onChange={this.onChange}
                    >
                      <MenuItem value="space">Space User</MenuItem>
                      <MenuItem value="admin">Admin </MenuItem>
                    </Select>
                  </div>

                  {/* <div className="form-group">
                    <label htmlFor="floor">Floor</label>
                    <input
                      type="floor"
                      className="form-control"
                      name="floor"
                      placeholder="Choose Floor"
                      value={this.state.floor}
                      onChange={this.onChange}
                    />
                  </div> */}

                 

                  {floorlist}

                  {lablist}
                    
                    

                  <button
                    type="submit"
                    className="btn btn-lg btn-primary btn-block"
                  >
                    Register!
              </button>
                </form>
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    )
  }
}

export default Register