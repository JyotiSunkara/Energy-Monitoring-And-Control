const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mapSchema = new Schema({
    floor:{
        type:Number
    },
    wing:{
        type:Number
    },
    room:{
        type:String
    },
    ac:{
        type:Number
    }
})
module.exports = User = mongoose.model('map', mapSchema)