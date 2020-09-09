const COmment = require('../models/comment');
const POst  = require('../models/post');
const { param, post } = require('../routes/posts');

module.exports.created = async function(req,res){
   try{
    let post = await POst.findById(req.body.post);

        if(post)
        {
            let comment = await COmment.create({
                content:req.body.content,
                post:req.body.post,
                user:req.user._id
            })
            // .sort('-createdAt');

                post.comment.push(comment);
                post.save();

                if(req.xhr){
                    return res.status(200).json({
                        data:{
                            comment:comment
                        },
                        message:"Comment Created!"
                    })
          
            }
                req.flash('success','Comment Created');

                res.redirect('back');
            
        }
    }
    catch(err)
    {
        // console.log('Error :',err);
        // return;
        req.flash('error',err);
        return res.redirect('back');
    }   
}

module.exports.destroy = async function(req,res){
    try{
    let comment = await COmment.findById(req.params.id);

        if(comment.user == req.user.id || req.user.id == post.user){ 
            let postId = comment.post;
            comment.remove();

            let post = await POst.findByIdAndUpdate(postId, { $pull: {comments : req.params.id}});

            if(req.xhr){
                return res.status(200).json({
                    data: {
                        comment_id: req.params.id
                    },
                    message:'Comment Deleted'
                })
            }
            req.flash('success','Comment Destroyed');
                return res.redirect('back');
                
            
        }
        else{
            req.flash('err','You cannot delete this post')
            return res.redirect('back');
        }
    }
       
    catch(err)
    {
        // console.log('Error : ',err)
        req.flash('error',err)
        return res.redirect('back');
    }
}