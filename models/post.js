const mongoose = reqiure('mongoose');

const postSchema = new mongoose.Schema({
    content:{
        type: String,
        reqiured: true
    },
    user: {
        type: mongoose.Schema.Types.ObjetId,
        ref: 'User'
    }
},{
    timestamps: true
});

const POst = mongoose.model('POst',postSchema);
module.exports = POst;