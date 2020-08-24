const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    description:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        // required:true
    }
});

const ITems = mongoose.model('ITems',contactSchema);

module.exports = ITems; 