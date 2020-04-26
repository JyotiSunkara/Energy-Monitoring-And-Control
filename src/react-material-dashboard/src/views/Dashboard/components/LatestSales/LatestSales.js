import React ,{useState,useEffect} from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Bar,Line } from 'react-chartjs-2';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Button,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import axios from 'axios'
import { data, options } from './chart';

const useStyles = makeStyles(() => ({
  root: {},
  chartContainer: {
    height: 400,
    position: 'relative'
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const LatestSales = props => {
  const graphlabel = ['Wind Direction (WSW)','Wind Speed (m/s)', 'Gust Speed (m/s)','Temperature (°C)','RH (%)', 'Dew Point (°C)', 'Solar Radiation (W/m²)', 'Battery (V)']

  const { className, ...rest } = props;
  const [res,setres]=useState(-1)
  const [name,setname]=useState('')
  const [index, setindex] = useState(0);
  const [change,setchange]=useState(0)
  const [data,setdata]=useState({
    labels: [],
    datasets: [
      {
        label: graphlabel[index]+' vs Date and Time',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: []
      }
    ]
  });

  const changevalue =(response)=>{
    setres(response)
    // console.log("HELL")
        // console.log(response)
        // console.log(response.data[index][0])
        let newdata={
        labels: response.data[index][0],
        datasets: [
          {
            label: graphlabel[index]+' vs Date and Time',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: response.data[index][1]
          }
        ]
      }
    
      // console.log("newdata")
      // console.log(newdata)
      setdata(
        newdata
      )
  }
if(change==1){
  setchange(0)
  let newdata={
    labels: res.data[index][0],
    datasets: [
      {
        label: graphlabel[index]+' vs Date and Time',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: res.data[index][1]
      }
    ]
  }

  console.log("newdata")
  console.log(newdata)
  setdata(
    newdata
  )}


  useEffect(()=>{
    const info=''
    axios.post('http://localhost:5000/graph/graphdata',info)
    .then(response=>{
      // console.log("SHIT AS FUCK")
      // console.log(response.data)
      // console.log(response.datasets[0].data)
      // console.log("FUCK")
      changevalue(response)
      
    })
  },[])
  const classes = useStyles();
  // console.log("HELLO")
  // console.log(data)
  // console.log(index)

  const handleChange = event => {
    // console.log("SHIT")
    setindex(event.target.value);
    // console.log(index)
    if(index!=-1 && res!=-1 )
  {
        // console.log("HELL")
        // console.log(res)
        // console.log(res.data[index][0])
        let newdata={
        labels: res.data[index][0],
        datasets: [
          {
            label: graphlabel[index]+' vs Date and Time',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: res.data[index][1]
          }
        ]
      }
      setchange(1)
      console.log("newdata")
      console.log(newdata)
      setdata(
        newdata
      )
  }
  };


  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        action={
          <>
          
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={index}
          onChange={handleChange}
        >
          <MenuItem value={0}>{graphlabel[0]}</MenuItem>
          <MenuItem value={1}>{graphlabel[1]}</MenuItem>
          <MenuItem value={2}>{graphlabel[2]}</MenuItem>
          <MenuItem value={3}>{graphlabel[3]}</MenuItem>
          <MenuItem value={4}>{graphlabel[4]}</MenuItem>
          <MenuItem value={5}>{graphlabel[5]}</MenuItem>
          <MenuItem value={6}>{graphlabel[6]}</MenuItem>
          <MenuItem value={7}>{graphlabel[7]}</MenuItem>
          
        </Select>
      </>}
        title="Graphical Data"
      />
      

      
      <Divider />
      <CardContent>
        <div className={classes.chartContainer}>
{/*          <Bar
            data={data}
            options={options}
/>*/}

<Line data={data} />
        </div>
      </CardContent>
      <Divider />
      <CardActions className={classes.actions}>
       
      </CardActions>
    </Card>
  );
};

LatestSales.propTypes = {
  className: PropTypes.string
};

export default LatestSales;
