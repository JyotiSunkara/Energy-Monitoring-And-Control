const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const UserSchema = new Schema({
  first_name: {
    type: String,
    required: true,

  },
  last_name: {
    type: String,
    required: true,

  },
  email: {
    type: String,
    required: true,
    unique:true,
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  position:{
    type:String,
    required:true
  },
  lab:{
    type:String,
    required:true
  },
  floor:{
    type:Number,
    required:true
  },
  list:[Number],
})

module.exports = User = mongoose.model('users', UserSchema)