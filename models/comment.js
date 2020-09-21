const mongoose = require('mongoose');

const commenteSchema = new mongoose.Schema({
    content: {
        type:String,
        required:true
    },
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref:'USer'
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'POst'
    },
    likes:[
        {
            type:mongoose.Schema.ObjectId,
               ref:'LIke'
        }
    ]
},
    {
        timestamps:true
    }
);

const COmment = mongoose.model('COmment',commenteSchema);
module.exports = COmment;