const mongoose = require('mongoose');

const uschema = new mongoose.Schema({
    email :{
        type:String,
        required:true,
        unique:true
    } ,
    password :{
        type:String,
        required:true,
        
    },
    name : {
        type:String,
        required:true
    }

}, {
    timestamps:true
});

const USer = mongoose.model('USer',uschema);
module.exports = USer;