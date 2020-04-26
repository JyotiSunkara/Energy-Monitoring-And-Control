const express = require('express')
const users = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const User = require('../models/User')
users.use(cors())

process.env.SECRET_KEY = 'secret'

users.post('/register', (req, res) => {
  const today = new Date()
  // console.log(req.body)
  const userData = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
    position:req.body.position,
    lab:req.body.lab,
    floor:req.body.floor,
    list:req.body.list,
    created: today
  }

  User.findOne({
    email: req.body.email
  })
    .then(user => {
      if (!user) {
        // console.log("HELLO")
        // console.log(user)
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          userData.password = hash
          

          User.create(userData)
            .then(user => {
              res.json({ status: user.email + ' Registered!' })
            })
            .catch(err => {
              res.send('error: ' + err)
            })
        })
      } else {
        console.log('User already exists')
        res.json({ error: 'User already exists' })
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

users.post('/login', (req, res) => {
  User.findOne({
    email: req.body.email
  })
    .then(user => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          // Passwords match
          
          const payload = {
            _id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            position:user.position,
            lab:user.lab,
            floor:user.floor,
            list:user.list

          }
          let token = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: 1440
          })
          res.send(token)
        } else {
          // Passwords don't match
          res.json({ error: 'User does not exist' })
        }
      } else {
        res.json({ error: 'User does not exist' })
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

users.get('/profile', (req, res) => {
  var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)
  // console.log('some problem')
  User.findOne({
    _id: decoded._id
  })
    .then(user => {
      
      if (user) {
        res.json(user)
      } else {
        res.send('User does not exist')
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

users.post('/list', (req, res) => {
//  console.log(req.body)

  User.find({
    email: req.body.Email
  })
    .then(user => {
      res.json(user)

    })
    .catch(err => {
      res.send('error: ' + err)
    })
})
users.post('/update',(req,res)=>{
  console.log(req.body)
  User.updateOne({email:req.body.Email},{$set:{list:req.body.list}})
  .then(user=>console.log(user))
  .catch(()=>console.log("User update ERROR!!!"))
})
users.route('/').get((req,res)=>{
  console.log("HELLO 123")
  User.find()
      .then(users=>{res.json(users);
      console.log(users)})
      .catch(err=>res.status(400).json('Error: '+err));
});

users.post('/passwordupdate',(req,res)=>{
  // console.log(req.body)

  // User.update({email:req.body.email},{$set:{password:req.body.password}})
  // .then(users=>{
  //   console.log("Password changed")
  //   console.log(users)
  // })
  // .catch(err=>
  //   console.log(err)
  // )
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    req.body.password = hash
    console.log(req.body)    
    User.find({email:req.body.email})
    .then(user=>{
      // console.log(user)
      // console.log(user[0]["password"])
      bcrypt.compare(req.body.previous,user[0].password,(err,ismatch)=>{
        // console.log(ismatch)
        if(!ismatch)
        {
          res.json("Old Password doesn't match")
        }
        else{
          User.updateOne({email:req.body.email},{$set:{password:req.body.password}})
          .then(users => {
            res.json("Password changed")
            // console.log(users)
            
          })
          .catch(err => {
            res.send('error: ' + err)
          })
        }
      })
    })
      

    
  })
});

users.post('/save',(req,res)=>{
  User.updateOne({email:req.body.email},{$set:{floor:req.body.floor,lab:req.body.lab}})
  .then((user)=>{
    console.log("UPDATED")
    // console.log(user)
  })
});

module.exports = users