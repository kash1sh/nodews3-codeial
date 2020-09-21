const mongoose = require('mongoose');
const POst = require('./post');
const COmment = require('./comment');

const likeSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId
    },
    // id of liked object
    likeable:{
        type: mongoose.Schema.ObjectId,
        require:true,
        refPath: 'onModel'
    },
// type of liked object
    onModel: {
        type:String,
        require:true,
        enum:["POst","COmment"]
    }
},
{
    timestamps:true
});
const LIke = mongoose.model('LIke',likeSchema);
module.exports = LIke;