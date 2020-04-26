var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var app = express()
const mongoose = require('mongoose')
var port = process.env.PORT || 5000

app.use(bodyParser.json())
app.use(cors())
app.use(
  bodyParser.urlencoded({
    extended: false
  })
)

const mongoURI = 'mongodb://localhost:27017/KRBApplication'

mongoose
  .connect(
    mongoURI,
    { useNewUrlParser: true }
  )
  .then(() =>{ 
    // mongoose.connection.db.dropDatabase();
    
    console.log('MongoDB Connected')})
  .catch(err => console.log(err))

var Users = require('./routes/Users')
var map = require('./routes/Map')
var request=require('./routes/RequestAPI')
var ACrouter=require('./routes/ACcontrol');
var graph=require('./routes/GraphAPI')
var SendEmail=require('./routes/EmailAPI')

app.use('/users', Users)
app.use('/control',ACrouter);
app.use('/map',map)
app.use('/request',request)
app.use('/graph',graph)
app.use('/email',SendEmail)

app.listen(port, function() {
  console.log('Server is running on port: ' + port)
})