const mongoose = require('mongoose')
const Schema = mongoose.Schema
const requestSchema = new Schema({
    Email:{
        type:String,
        required:true
    },
    ac:{
        type:Number,
        required:true
    },
})
module.exports = User = mongoose.model('request', requestSchema)