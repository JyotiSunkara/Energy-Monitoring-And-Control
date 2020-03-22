import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem ,Card,Button,Form,Modal,ButtonToolbar} from 'react-bootstrap';




export default class View extends Component {
constructor(props)
{
    super(props)
    this.state={
        status:'',
        temp:''
    }
    this.getDetails=this.getDetails.bind(this)
   
    
}
getDetails(){
    axios.get('http://localhost:5000/control/status')
    .then(res=>{
        if(res.data=="0")
        {
            this.setState({status:"OFF"})
            axios.get('http://localhost:5000/control/temp')
            .then(res=>{
                this.setState({temp:res.data        })
            })
        }

        else if(res.data=="1")
        {
            this.setState({status:"ON"})
            axios.get('http://localhost:5000/control/temp')
            .then(res=>{
                this.setState({temp:res.data        })
            })
        }
        })
    .catch(()=>console.log('error'))
    
}
componentDidMount(){
    this.getDetails();
    this.interval=setInterval(()=>
    {
        console.log('loop')
        this.getDetails();
    },20000
    )
}
componentWillUnmount() {
    clearInterval(this.interval);
}

render(){
    let array=[]
    
    for(let i=0;i<1;i++)
    {
        array.push(
            <div>
            <Card className="text-center">
            <Card.Header>AC {i+1}</Card.Header>
            <Card.Body>
            <Card.Title>Status : {this.state.status}</Card.Title>
                        
            <Card.Title>Temperature : {this.state.temp}</Card.Title>
              

            
            </Card.Body>
            
            </Card>
            </div>
        )
    }
    return(
        <div>
        {array}
        </div>
    )
   }
}
