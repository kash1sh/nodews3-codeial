const POst = require('../models/post');
const COmments = require('../models/comment');
const COmment = require('../models/comment');
module.exports.created = function(req,res){
    POst.create({
        content:req.body.content,
        user:req.user._id
    },function(err,post){
        if(err){console.log(`error in creating a post`); return;}

        return res.redirect('back');
    })

}

module.exports.destroy = function(req,res)
{
    POst.findById(req.params.id,function(err,post){
    // it should be req.user._id but we have to compare as stirng so there is a prop which converts _id to id to make it string form
        if(post.user == req.user.id){
        post.remove();

        COmment.deleteMany({post:req.params.id},function(err){
            return res.redirect('back');
        })
    }
    else{
        return res.redirect('back');    
    }
    })
}