const POst = require('../../../models/post');
const COmment = require('../../../models/comment');
module.exports.index = async function(req,res){

    
        let posts = await POst.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path:'comment',
            populate: {
                path : 'user'
            }
        });

    return res.json(200, {
        message : "List of posts",
        posts : posts
    })
}

module.exports.destroy = async function(req,res)
{
    try{
        let post = await POst.findById(req.params.id);
        if(post.user == req.user.id){
            post.remove();
        
            await COmment.deleteMany({post:req.params.id});

            // if(req.xhr){
            //     return res.status(200).json({
            //         data:{
            //             post_id:req.params.id
            //         },
            //         message: "Post Deleted"
            //     })
            

            // req.flash('success','Posts and associated comments destroyed');
                return res.status(200).json({
                    message:"Post and associated comment deleted"
                })
        }  
         
        else{
            // req.flash('err','You cannot delete this post');
            // return res.redirect('back');    
            return res.status(401).json({
                message:'You cannot delete this post'
            })
        }
    }
    catch(err)
    {
        // console.log('Err : ',err);
        // req.flash('error',err);
        return res.status(500).json({
            message:'Internal Server Error'
        })
    }
}