const COmment = require('../models/comment');
const POst  = require('../models/post');
const { param, post } = require('../routes/posts');

module.exports.created = function(req,res){
    POst.findById(req.body.post,function(err,post){
        if(post)
        {
            COmment.create({
                content:req.body.content,
                post:req.body.post,
                user:req.user._id
            },function(err,comment){

                post.comment.push(comment);
                post.save();
                res.redirect('back');
            })
        }
    })

}

module.exports.destroy = function(req,res){
    COmment.findById(req.params.id, function(err,comment,post){
        if(comment.user == req.user.id || req.user.id == post.user){ 
            let postId = comment.post;
            comment.remove();

            POst.findByIdAndUpdate(postId, { $pull: {comments : req.params.id}}, function(err,post){
                return res.redirect('back');
            })
        }
        else{
            return res.redirect('back');
        }
    })
}