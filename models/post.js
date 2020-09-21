const mongoose = require('mongoose');
// const COmment = require('./comment');

const postSchema = new mongoose.Schema({
    content:{
        type: String,
        reqiured: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'USer'
    },
    comment:[
     {
        type: mongoose.Schema.Types.ObjectId,
        ref:'COmment'
    }
],
    likes:[
    {
        type:mongoose.Schema.ObjectId,
           ref:'LIke'
    }
]
},{
    timestamps: true
});

const POst = mongoose.model('POst',postSchema);
module.exports = POst;