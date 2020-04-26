import React, { Component } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Slider from '@material-ui/core/Slider';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import './control.css';
import axios from 'axios'
import PinchZoomPan from 'react-responsive-pinch-zoom-pan';
import jwt_decode from 'jwt-decode'
import { decode } from 'punycode';
import wing1 from './third/wing-1.jpg'
import firstfloor from './first/1.jpg'

import Modal from './Modal';


var selectfloor=''
var imageview='';
var resetbut
class Control extends Component {
    constructor(props) {
        super(props);

        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            position: '',
            floor: '',
            lab: '',
            isOn: "off",
            tempvalue:20,
            ac:-1,
            select:0,
            print:'',
            isShowing: false,
            ac_name:''
        };
        this.onSubmit=this.onSubmit.bind(this)
        this.setTemp=this.setTemp.bind(this)
        this.ac=this.ac.bind(this)
        this.onChange=this.onChange.bind(this)
        this.wing=this.wing.bind(this)
        this.reset=this.reset.bind(this)

    }

    setTemp=(event,value)=>{this.setState({tempvalue:value})}
    
    
    setOn = (event) => {
        this.setState({ isOn: event.target.value });
    }
    
    onChange(e) {
        console.log(e.target.name+" "+e.target.value)
        
        this.setState({ floor: e.target.value })
    }

    openModalHandler = () => {
        console.log("SHIT")
        this.setState({
            isShowing: true
        });
        
    }

    closeModalHandler = () => {
        console.log("lag gaye")
        // console.log(e)
        this.setState({
            isShowing: false
        });
    }




    componentDidMount() {
        // this.interval = setInterval(() => this.render), 2000);
        // this.interval = setInterval(() => this.setState({print:imageview}), 1000);
        const token = localStorage.usertoken
        const decoded = jwt_decode(token)
        console.log(decoded)
        this.setState({
          first_name: decoded.first_name,
          last_name: decoded.last_name,
          email: decoded.email,
          position: decoded.position,
          floor: decoded.floor,
          lab: decoded.lab
        })
      }
      componentWillUnmount() {
        clearInterval(this.interval);
      }
    ac(e,ac_names){
        
        this.setState({ac:e})
        this.setState({ac_name:ac_names})
        this.openModalHandler()
        
       
        
    }
    
    wing(e){
        
        console.log(e)
        this.setState({select:e})
        
       
    }
    onSubmit(e)
    {
    
        if(this.state.isOn=="on"){
        let info1={
            no:this.state.ac
        }
        console.log(info1)
        axios.post('http://localhost:5000/control/on',info1)
        .then(res=>
            {
                console.log(this.state.tempvalue)

            })
        
        let info2={
            temp:this.state.tempvalue,
            no:this.state.ac
        }
        console.log(info2)
        axios.post('http://localhost:5000/control/change',info2)
        .then(res=>
            console.log(''))
        
        }
        else if(this.state.isOn=="off"){
            let info1={
                no:this.state.ac
            }
        console.log(info1)

            axios.post('http://localhost:5000/control/off',info1)
                .then(res=>
                    console.log('hello')
                    )
            }

    }
    
    reset(event)
    {
        this.setState({select:0})
    }
    render() {
        
        if(this.state.floor=='3')
        {

            if(this.state.select==0 )
            {
                imageview=''
                
                imageview=
                <div>
                <img src={require(('./third/3.jpg'))} alt="resposnive imgage with clickable areas" width="800" height="500" className="aligncenter size-full wp-image-3344" useMap="#3image-map" />
                <map name="3image-map">
                <area target="_blank"  alt="WING-IV" title="WING-IV"  coords="12,11,404,242" shape="rect" onClick={(e)=>this.wing(4)}/>
                <area   target="_blank" alt="WING-III" title="WING-III" coords="432,9,781,240" shape="rect" onClick={(e)=>this.wing(3)}/>
                <area  target="_blank" alt="WING-II" title="WING-II"  coords="437,261,784,496" shape="rect" onClick={(e)=>this.wing(2)}/>
                <area   target="_blank"   alt="WING-I" title="WING-I"  coords="8,260,404,494" shape="rect" onClick={(e)=>this.wing(1)}/>
                </map>
                </div>

            }
            else if(this.state.select==1)
            {
              
                imageview=
                <div>
                <img src={require(('./third/wing-1.jpg'))} alt="resposnive imgage with clickable areas" width="800" height="500" className="aligncenter size-full wp-image-3344" useMap="#3mage1-map" />
                <map name="3mage1-map">
                <area alt="" title="STUDENT WORKSPACE-1 AC" coords="389,229,284,110" shape="rect" onClick={(e)=>this.ac(67,"STUDENT WORKSPACE-1 AC")}/>
                <area alt="" title="F30" coords="566,381,640,466" shape="rect" onClick={(e)=>this.ac(66,"F30")}/>
                </map>
                </div>
            }
            else if(this.state.select==2)
            {
                imageview=
                <div>
                <img src={require(('./third/wing-2.jpg'))} alt="resposnive imgage with clickable areas" width="800" height="500" className="aligncenter size-full wp-image-3344" useMap="#3mage2-map" />
                <map name="3mage2-map">
                    <area  alt="" title="STUDENT WORKSPACE-2 AC"  coords="550,155,439,39" shape="rect" onClick={(e)=>this.ac(73,"STUDENT WORKSPACE-2 AC")}/>
                    <area  alt="" title="F31"  coords="88,338,138,456" shape="rect" onClick={(e)=>this.ac(65,"F31")}/>
                    <area  alt="" title="F32"  coords="141,331,221,462" shape="rect" onClick={(e)=>this.ac(64,"F32")}/>
                    <area  alt="" title="F33"  coords="430,261,497,354" shape="rect"onClick={(e)=>this.ac(68,"F33")}/>
                    <area  alt="" title="F34"  coords="501,258,560,355,544,405,508,257" shape="rect"onClick={(e)=>this.ac(69,"F34")}/>
                    <area  alt="" title="F35"  coords="579,224,661,294" shape="rect" onClick={(e)=>this.ac(70,"F35")}/>
                    <area  alt="" title="F36"  coords="585,153,662,219" shape="rect"onClick={(e)=>this.ac(71,"F36")}/>
                    <area  alt="" title="F37"  coords="583,49,666,132" shape="rect"onClick={(e)=>this.ac(72,"F37")}/>
                </map>
                </div>
            }
            else if(this.state.select==3)
            {
                
                imageview=
                <div>
                <img src={require(('./third/wing-3.jpg'))} alt="resposnive imgage with clickable areas" width="800" height="500" className="aligncenter size-full wp-image-3344" useMap="#3mage3-map" />
                <map name="3mage3-map">
                    <area  alt="" title="1"  coords="115,290,310,392" shape="rect"/>
                    <area  alt="" title="2"  coords="125,201,308,283" shape="rect"/>
                    <area  alt="" title="3"  coords="121,130,314,194" shape="rect"/>
                    <area  alt="" title="4"  coords="122,37,321,123" shape="rect"/>
                </map>
                </div>
            }
            else if(this.state.select==4)
            {
                imageview=
                <div>
                <img src={require(('./third/wing-4.jpg'))} alt="resposnive imgage with clickable areas" width="800" height="500" className="aligncenter size-full wp-image-3344" useMap="#3mage4-map" />
                <map name="3mage4-map">
                    <area  alt="" title="STUDENT WORKSPACE AC-1"  coords="181,379,234,465" shape="rect" onClick={(e)=>this.ac(84,"STUDENT WORKSPACE AC-1")}/>
                    <area  alt="" title="STUDENT WORKSPACE AC-2"  coords="246,380,303,464" shape="rect" onClick={(e)=>this.ac(85,"STUDENT WORKSPACE AC-2")}/>
                    <area  alt="" title="MEETING ROOM-AWAY"  coords="55,361,133,416" shape="rect" onClick={(e)=>this.ac(82,"MEETING ROOM-AWAY")}/>
                    <area  alt="" title="MEETING ROOM-CLOSER"  coords="53,423,130,470" shape="rect" onClick={(e)=>this.ac(83,"MEETING ROOM-CLOSER")}/>
                    <area  alt="" title="F-41"  coords="61,282,158,343" shape="rect" onClick={(e)=>this.ac(81,"F-41")}/>
                    <area  alt="" title="F-40"  coords="61,214,167,280" shape="rect" onClick={(e)=>this.ac(80,"F-40")}/>
                    <area  alt="" title="F-39"  coords="179,146,231,235" shape="rect" onClick={(e)=>this.ac(79,"F-39")}/>
                    <area  alt="" title="F-38"  coords="235,147,295,216" shape="rect" onClick={(e)=>this.ac(78,"F-38")}/>
                </map>
                </div>
            }
            else
            {
                imageview=
                <div width="800" height="500"></div>
            }
            

        }
        else if(this.state.floor==2)
        {
            if(this.state.select==0 )
            {
                imageview=''
                
                imageview=
                <div>
                <img src={require(('./second/2.jpg'))} alt="resposnive imgage with clickable areas" width="800" height="500" className="aligncenter size-full wp-image-3344" useMap="#2image-map" />
                <map name="2image-map">
                    <area  alt="WING-I" title="WING-I"  coords="67,260,359,483" shape="rect" onClick={(e)=>this.wing(1)}/>
                    <area  alt="WING-II" title="WING-II"  coords="458,260,755,483" shape="rect" onClick={(e)=>this.wing(2)}/>
                    <area  alt="WING-III" title="WING-III"  coords="402,26,785,243" shape="rect" onClick={(e)=>this.wing(3)}/>
                    <area  alt="WING-IV" title="WING-IV"  coords="72,30,354,225" shape="rect" onClick={(e)=>this.wing(4)}/>
                </map>
                </div>

            }
            else if(this.state.select==1)
            {
              
                imageview=
                <div>
                <img src={require(('./second/wing-1.jpg'))} alt="resposnive imgage with clickable areas" width="800" height="500" className="aligncenter size-full wp-image-3344" useMap="#2mage1-map" />
                <map name="2mage1-map">
                    <area  alt="1" title="STUDENT WORKSPACE-1"  coords="240,133,299,203" shape="rect" onClick={(e)=>this.ac(18,"STUDENT WORKSPACE-1")}/>
                    <area  alt="2" title="STUDENT WORKSPACE-2"  coords="304,132,357,204" shape="rect" onClick={(e)=>this.ac(19,"STUDENT WORKSPACE-2")}/>
                    <area  alt="3" title="F16"  coords="160,234,231,277" shape="rect" onClick={(e)=>this.ac(15,"F16")}/>
                    <area  alt="4" title="F15"  coords="162,288,229,321" shape="rect" onClick={(e)=>this.ac(16,"F15")}/>
                    <area  alt="5" title="F14"  coords="162,324,232,361" shape="rect" onClick={(e)=>this.ac(17,"F14")}/>
                </map>
                </div>
            }
            else if(this.state.select==2)
            {
                imageview=
                <div>
                <img src={require(('./second/wing-2.jpg'))} alt="resposnive imgage with clickable areas" width="800" height="500" className="aligncenter size-full wp-image-3344" useMap="#2mage2-map" />
                <map name="2mage2-map">
                    <area  alt="1" title="STUDENT WORKSPACE-1"  coords="306,136,391,200" shape="rect" onClick={(e)=>this.ac(32,"STUDENT WORKSPACE-1")}/>
                    <area  alt="2" title="MEETING ROOM"  coords="397,95,465,157" shape="rect" onClick={(e)=>this.ac(31,"MEETING ROOM")}/>
                    <area  alt="3" title="F-21"  coords="471,105,544,180" shape="rect" onClick={(e)=>this.ac(30,"F-21")}/>
                    <area  alt="4" title="F-20"  coords="520,229,579,284" shape="rect" onClick={(e)=>this.ac(29,"F-20")}/>
                    <area  alt="5" title="F-19"  coords="520,312,592,373" shape="rect" onClick={(e)=>this.ac(28,"F-19")}/>
                    <area  alt="6" title="F-18 (NOT WORKING)"  coords="441,302,507,364" shape="rect" onClick={(e)=>this.ac(27,"F-18(NOT WORKING)")}/>
                    <area  alt="7" title="F-17"  coords="382,295,437,369" shape="rect" onClick={(e)=>this.ac(26,"F-17")}/>
                </map>
                </div>
            }
            else if(this.state.select==3)
            {
                
                imageview=
                <div>
                <img src={require(('./second/wing-3.jpg'))} alt="resposnive imgage with clickable areas" width="800" height="500" className="aligncenter size-full wp-image-3344" useMap="#2mage3-map" />
                <map name="2mage3-map">
                    <area  alt="1" title="Student Workspace-1"  coords="442,410,505,479" shape="rect" onClick={(e)=>this.ac(44,"Student Workspace-1")}/>
                    <area  alt="2" title="Student Workspace-2"  coords="510,411,564,481" shape="rect" onClick={(e)=>this.ac(43,"Student Workspace-2")}/>
                    <area  alt="3" title="F22"  coords="674,281,745,339" shape="rect" onClick={(e)=>this.ac(42,"F22")}/>
                    <area  alt="4" title="F23"  coords="657,216,741,263" shape="rect" onClick={(e)=>this.ac(41,"F23")}/>
                    <area  alt="5" title="F24"  coords="660,161,740,212" shape="rect" onClick={(e)=>this.ac(40,"F24")}/>
                    <area  alt="6" title="F25"  coords="598,51,660,129" shape="rect" onClick={(e)=>this.ac(39,"F25")}/>
                    <area  alt="7" title="F26"  coords="532,54,593,127" shape="rect" onClick={(e)=>this.ac(38,"F26")}/>
                </map>
                </div>
            }
            else if(this.state.select==4)
            {
                imageview=
                <div>
                <img src={require(('./second/wing-4.jpg'))} alt="resposnive imgage with clickable areas" width="800" height="500" className="aligncenter size-full wp-image-3344" useMap="#2mage4-map" />
                <map name="2mage4-map">
                    <area  alt="1" title="Student workspace"  coords="378,356,465,426" shape="rect" onClick={(e)=>this.ac(55,"Student workspace")}/>
                    <area  alt="2" title="Meeting Room-1"  coords="274,312,361,369" shape="rect" onClick={(e)=>this.ac(54,"Meeting Room-1")}/>
                    <area  alt="3" title="Meeting Room-2"  coords="171,311,264,372" shape="rect" onClick={(e)=>this.ac(53,"Meeting Room-2")}/>
                    <area  alt="4" title="F27(confusion)"  coords="196,187,255,251" shape="rect" onClick={(e)=>this.ac(52,"F27(confusion)")}/>
                    <area  alt="5" title="F28(confusion)"  coords="260,190,316,252" shape="rect" onClick={(e)=>this.ac(51,"F28(confusion)")}/>
                    <area  alt="6" title="F29"  coords="495,61,581,131" shape="rect" onClick={(e)=>this.ac(50,"F29")}/>
                </map>
                </div>
            }
            else
            {
                imageview=
                <div width="800" height="500"></div>
            }
        }
        else if(this.state.floor=='1')
        {
            if(this.state.select==0 )
            {
                imageview=''
                
                imageview=
                <div>
                <img src={require(('./first/1.jpg'))} alt="resposnive imgage with clickable areas" width="800" height="500" className="aligncenter size-full wp-image-3344" useMap="#1image-map" />
                <map name="1image-map">
                <area  alt="WING-I" title="WING-I"   coords="12,251,377,496" shape="rect" onClick={(e)=>this.wing(1)}/>
                <area  alt="WING-II" title="WING-II"   coords="403,248,770,499" shape="rect" onClick={(e)=>this.wing(2)}/>
                <area  alt="WING-III" title="WING-III"   coords="768,236,388,11" shape="rect" onClick={(e)=>this.wing(3)}/>
                <area  alt="WING-IV" title="WING-IV"   coords="365,238,17,15" shape="rect" onClick={(e)=>this.wing(4)}/>
                </map>
                </div>

            }
            else if(this.state.select==1)
            {
              
                imageview=
                <div>
                <img src={require(('./first/wing-1.jpg'))} alt="resposnive imgage with clickable areas" width="800" height="500" className="aligncenter size-full wp-image-3344" useMap="#1mage1-map" />
                <map name="1mage1-map">
                    <area  alt="1" title="STUDENT WORKSPACE"  coords="287,71,431,161" shape="rect" onClick={(e)=>this.ac(14,"STUDENT WORKSPACE")}/>
                    <area  alt="2" title="F3"  coords="120,195,216,251" shape="rect" onClick={(e)=>this.ac(11,"F3")}/>
                    <area  alt="3" title="F2"  coords="122,259,212,302" shape="rect" onClick={(e)=>this.ac(12,"F2")}/>
                    <area  alt="4" title="F1"  coords="214,307,122,366" shape="rect" onClick={(e)=>this.ac(13,"F1")}/>

                </map>
                </div>
            }
            else if(this.state.select==2)
            {
                imageview=
                <div>
                <img src={require(('./first/wing-2.jpg'))} alt="resposnive imgage with clickable areas" width="800" height="500" className="aligncenter size-full wp-image-3344" useMap="#1mage2-map" />
                <map name="1mage2-map">
                    <area  alt="1" title="STUDENT WORKSPACE"  coords="291,60,416,152" shape="rect" onClick={(e)=>this.ac(25,"STUDENT WORKSPACE")}/>
                    <area  alt="2" title="MEETING ROOM-1"  coords="432,84,528,185" shape="rect" onClick={(e)=>this.ac(24,"MEETING ROOM-1")}/>
                    <area  alt="3" title="MEETING ROOM-2"  coords="590,104,677,172" shape="rect" onClick={(e)=>this.ac(23,"MEETING ROOM-2")}/>
                    <area  alt="4" title="F6"  coords="592,184,674,236" shape="rect" onClick={(e)=>this.ac(22,"F6")}/>
                    <area  alt="5" title="F5"  coords="586,244,673,288" shape="rect" onClick={(e)=>this.ac(21,"F5")}/>
                    <area  alt="6" title="F4"  coords="580,291,681,351" shape="rect" onClick={(e)=>this.ac(20,"F4")}/>
                </map>
                </div>
            }
            else if(this.state.select==3)
            {
                
                imageview=
                <div>
                <img src={require(('./first/wing-3.jpg'))} alt="resposnive imgage with clickable areas" width="800" height="500" className="aligncenter size-full wp-image-3344" useMap="#1mage3-map" />
                <map name="1mage3-map">
                    <area  alt="1" title="STUDENT WORKSPACE"  coords="321,357,431,470" shape="rect" onClick={(e)=>this.ac(37,"STUDENT WORKSPACE")}/>
                    <area  alt="2" title="F10"  coords="620,70,707,143" shape="rect" onClick={(e)=>this.ac(33,"F10")}/>
                    <area  alt="3" title="F7"  coords="631,273,703,342" shape="rect" onClick={(e)=>this.ac(36,"F7")}/>
                    <area  alt="4" title="F8"  coords="623,211,705,261" shape="rect" onClick={(e)=>this.ac(35,"F8")}/>
                    <area  alt="5" title="F9"  coords="621,154,708,207" shape="rect" onClick={(e)=>this.ac(34,"F9")}/>
                </map>
                </div>
            }
            else if(this.state.select==4)
            {
                imageview=
                <div>
                <img src={require(('./first/wing-4.jpg'))} alt="resposnive imgage with clickable areas" width="800" height="500" className="aligncenter size-full wp-image-3344" useMap="#1mage4-map" />
                <map name="1mage4-map">
                    <area  alt="1" title="STUDENT WORKSPACE"  coords="371,339,466,454" shape="rect" onClick={(e)=>this.ac(49,"STUDENT WORKSPACE")}/>
                    <area  alt="2" title="MEETING ROOM"  coords="260,334,354,433" shape="rect" onClick={(e)=>this.ac(48,"MEETING ROOM")}/>
                    <area  alt="3" title="F11"  coords="96,270,174,326" shape="rect" onClick={(e)=>this.ac(47,"F11")}/>
                    <area  alt="4" title="F12"  coords="91,219,183,261" shape="rect" onClick={(e)=>this.ac(46,"F12")}/>
                    <area  alt="5" title="F13"  coords="92,170,183,216" shape="rect" onClick={(e)=>this.ac(45,"F13")}/>
                </map>
                </div>
            }
            else
            {
                imageview=
                <div width="800" height="500"></div>
            }
        }
        else if(this.state.floor=='0')
        {
            if(this.state.select==0 )
            {
                imageview=''
                
                imageview=
                <div>
                <img src={require(('./ground/0.jpg'))} alt="resposnive imgage with clickable areas" width="800" height="500" className="aligncenter size-full wp-image-3344" useMap="#0image-map" />
                <map name="0image-map">
                    <area  alt="1" title="RECEPTION AREA"  coords="518,369,586,432" shape="rect" onClick={(e)=>this.ac(4,"RECEPTION AREA")} />
                    <area  alt="2" title="CEO ROOM"  coords="400,389,476,457" shape="rect" onClick={(e)=>this.ac(5,"CEO ROOM")}/>
                    <area  alt="3" title="BOARD ROOM"  coords="417,225,483,284" shape="rect" onClick={(e)=>this.ac(6,"BOARD ROOM")}/>
                    <area  alt="4" title="FACULTY MEETING ROOM-1"  coords="290,241,367,310" shape="rect" onClick={(e)=>this.ac(0,"FACULTY MEETING ROOM-1")}/>
                    <area  alt="5" title="FACULTY MEETING ROOM-2"  coords="174,238,255,309" shape="rect" onClick={(e)=>this.ac(1,"FACULTY MEETING ROOM-2")}/>
                    <area  alt="6" title="FACULTY MEETING ROOM-3"  coords="180,81,258,154" shape="rect" onClick={(e)=>this.ac(2,"FACULTY MEETING ROOM-3" )}/>
                    <area  alt="7" title="FACULTY MEETING ROOM-4"  coords="283,76,369,159" shape="rect" onClick={(e)=>this.ac(3,"FACULTY MEETING ROOM-4" )}/>
                    <area  alt="8" title="CHAIR PERSON ROOM-1"  coords="518,233,609,302" shape="rect" onClick={(e)=>this.ac(7,"CHAIR PERSON ROOM-1")}/>
                    <area  alt="9" title="CHAIR PERSON ROOM-2"  coords="517,158,613,225" shape="rect" onClick={(e)=>this.ac(8,"CHAIR PERSON ROOM-2")}/>
                    
                </map>
                </div>

            }
            // else if(this.state.select==1)
            // {
              
            //     imageview=
            //     <div>
            //     <img src={require(('./ground/wing-1.jpg'))} alt="resposnive imgage with clickable areas" width="800" height="500" className="aligncenter size-full wp-image-3344" useMap="#mage1-map" />
            //     <map name="mage1-map">
            //     <area alt="" title="1" coords="389,229,284,110" shape="rect"/>
            //     <area alt="" title="2" coords="566,381,640,466" shape="rect"/>
            //     </map>
            //     </div>
            // }
            // else if(this.state.select==2)
            // {
            //     imageview=
            //     <div>
            //     <img src={require(('./ground/wing-2.jpg'))} alt="resposnive imgage with clickable areas" width="800" height="500" className="aligncenter size-full wp-image-3344" useMap="#mage2-map" />
            //     <map name="mage2-map">
            //         <area  alt="" title="1"  coords="550,155,439,39" shape="rect"/>
            //         <area  alt="" title="2"  coords="88,338,138,456" shape="rect"/>
            //         <area  alt="" title="3"  coords="141,331,221,462" shape="rect"/>
            //         <area  alt="" title="4"  coords="430,261,497,354" shape="rect"/>
            //         <area  alt="" title="5"  coords="501,258,560,355,544,405,508,257" shape="rect"/>
            //         <area  alt="" title="6"  coords="579,224,661,294" shape="rect"/>
            //         <area  alt="" title="7"  coords="585,153,662,219" shape="rect"/>
            //         <area  alt="" title="8"  coords="583,49,666,132" shape="rect"/>
            //     </map>
            //     </div>
            // }
            
            else
            {
                imageview=
                <div width="800" height="500"></div>
            }
        }
        else
        {
            imageview=
            <div width="800" height="500"></div>
        }
        // this.setState({print:imageview})
        
        if(this.state.select!=0)
        {
            resetbut=
            <div>
            <Button variant="contained" color="primary" onClick={this.reset}>Go Back !!</Button>
            </div>
        }
        else{
            resetbut=
            <></>
        }
        if(this.state.position=="admin"||this.state.position=="space")
        {
            // console.log("LODDE LAG GAYE")
            selectfloor=
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
            <MenuItem value="0">Ground floor</MenuItem>
            <MenuItem value="1">First floor</MenuItem>
            <MenuItem value="2">Second floor</MenuItem>
            <MenuItem value="3">Third floor</MenuItem>
            </Select>
        </div>
        }
        else{
            selectfloor=<></>
        }
        
        return (
            <div>
            <div className="h2">Control AC</div>
            
               
           
            <div className="centers">
                
               
                {selectfloor}   
                {imageview}
                
                
                {/*<form class="form">     
                <br></br>
                    <InputLabel>On/Off</InputLabel>
                    <Select onChange={this.setOn} value={this.state.isOn}>
                        <MenuItem value="off">Off</MenuItem>
                        <MenuItem value="on">On</MenuItem>
                    </Select>
                    

                    {tempSlider}

                    <Button variant="outlined" color="primary" onClick={this.onSubmit}>Set</Button>
        </form>*/}
            {resetbut}
            
            </div>
            
            { this.state.isShowing ? <div onClick={this.closeModalHandler} className="back-drop"></div> : null }

            
            {console.log("call ho ja")}
            <Modal
                className="modal"
                show={this.state.isShowing}
                close={this.closeModalHandler}
                ac={this.state.ac}
                ac_name={this.state.ac_name}>
                    
            </Modal>
        
            </div>
            );
    }
}

export default Control;
