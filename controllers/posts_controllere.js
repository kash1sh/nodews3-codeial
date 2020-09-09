const POst = require('../models/post');
const COmments = require('../models/comment');
const COmment = require('../models/comment');
module.exports.created = async function(req,res){
    try{
        let post=await POst.create({
            content:req.body.content,
            user:req.user._id
        })
        ;

        if(req.xhr){
            return res.status(200).json({
                data:{
                    post:post
                },
                message:"Post Created!"
            })
        }
    req.flash('success','Post Published');
        return res.redirect('back');
    }
   catch(err){
    //    console.log('Error:',err);
    req.flash('error',err);
       return res.redirect('back');
   }

}

module.exports.destroy = async function(req,res)
{
    try{
        let post = await POst.findById(req.params.id,);
        if(post.user == req.user.id){
            post.remove();
        
            await COmment.deleteMany({post:req.params.id});

            if(req.xhr){
                return res.status(200).json({
                    data:{
                        post_id:req.params.id
                    },
                    message: "Post Deleted"
                })
            }

            req.flash('success','Posts and associated comments destroyed');
                return res.redirect('back');
            
        } 
        else{
            req.flash('err','You cannot delete this post');
            return res.redirect('back');    
        }
    }
    catch(err)
    {
        // console.log('Err : ',err);
        req.flash('error',err);
        return res.redirect('back');
    }
   
}