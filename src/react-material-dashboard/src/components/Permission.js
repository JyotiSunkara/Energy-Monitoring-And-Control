import React, { Component } from 'react';
// import InputLabel from '@material-ui/core/InputLabel';
// import MenuItem from '@material-ui/core/MenuItem';
// import Select from '@material-ui/core/Select';
// import Button from '@material-ui/core/Button';
// import Slider from '@material-ui/core/Slider';
// import { withStyles, makeStyles } from '@material-ui/core/styles';
import './Permission.css';
import axios from 'axios'
import PinchZoomPan from 'react-responsive-pinch-zoom-pan';
import jwt_decode from 'jwt-decode'
import { decode } from 'punycode';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem ,Card,Button,Form,Modal,ButtonToolbar} from 'react-bootstrap';
import './control.css';

// import Modal from './Modal';
import { array } from 'prop-types';

class Permission extends Component{
    constructor(props)
    {
        super(props)
        this.state={
            requestlist:[],
            length:0,

        }
        this.getlist=this.getlist.bind(this)
        this.allow=this.allow.bind(this)
        this.dismiss=this.dismiss.bind(this)
        this.getlist()
  
    }
    componentDidMount(){
        
        this.getlist()

        this.interval = setInterval(() => {
            this.getlist();
          }, 5000);


    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    getlist()
    {
        console.log("START GET LIST")
        axios.get('http://localhost:5000/request/')
        .then(res=>{
        console.log(res.data)
        this.setState({requestlist:res.data,length:res.data.length})
    })
    .catch(err=>console.log("Some kind of error is there"))
               
    }
    allow(index)
    {
        let list=[]
        console.log("index "+index)
        var info={
            Email:this.state.requestlist[index].Email
        }
        var ac_index=this.state.requestlist[index].ac
        this.dismiss(index);
        axios.post('http://localhost:5000/users/list',info)
        .then(res=>{
            console.log(res.data[0])
            list=res.data[0].list

            list.push(ac_index)
            var info1={
                list:list,
                Email:res.data[0].email
            }
            console.log(info1)
            axios.post('http://localhost:5000/users/update',info1)
            .then(res=>console.log(res+"MAY BE NO PROBLEM"))
            .catch(()=>console.log("ERROR"))
        //    let f= this.state.requestlist.splice(index,1)
            // console.log(f)
        })
        .catch(()=>console.log("SOME KIND OF PROBLEM IN PERMISSION.js "))
    }
    dismiss(index)
    {
        var info={
            email:this.state.requestlist[index].Email,
            ac:this.state.requestlist[index].ac
        }
        axios.post('http://localhost:5000/request/delete',info)
        .then(()=>{
            console.log("START GET LIST")
            axios.get('http://localhost:5000/request/')
            .then(res=>{
            console.log(res.data)
            this.setState({requestlist:res.data,length:res.data.length})
        })
    })
        // this.getlist()
    }
    render(){
        console.log("LIST")
        console.log(this.state.requestlist)
        let array=[]
        for(let i=0;i<this.state.length;i++)
        {
            array.push(
                <div>
                <Card style={{ width: '30rem' }}>
                <Card.Body>
                    
                    <Card.Subtitle className="mb-2 text-muted">Request</Card.Subtitle>
                    <Card.Text>
                    User with email id {this.state.requestlist[i].Email} wants to control the Ac no. {this.state.requestlist[i].ac}
                    </Card.Text>
                    <Button variant="primary" onClick={()=>this.allow(i)}>ALLOW</Button>  
                    <>  </>
                    <Button variant="outline-primary" onClick={()=>this.dismiss(i)}>DISMISS</Button>
                    </Card.Body>
                </Card>
                <br></br>
                </div>
            )
        }
        return(
            <div><div className="center">{array}</div></div>
        )
    }
}
export default Permission;