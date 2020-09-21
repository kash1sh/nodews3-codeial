const COmment = require('../models/comment');
const POst = require('../models/post');
// const Like = require('../models/like');
const LIke = require('../models/like');

module.exports.ToggleLike = async function(req,res){
    try{
        //  likes/toggle/?id=abcd&type=Post
        let likeable;
        let deleted = false;

        if(req.query.type=='POst'){
            likeable= await POst.findById(req.query.id).populate('likes');
        }
        else{
            likeable = await COmment.findById(req.query.id).populate('likes');
        }
        // checking if a like already exists
        let existingLike = await LIke.findOne({
            likeable:req.query.id,
            onModel:req.query.type,
            user:req.user._id
        })
        // if a like already exists
        if(existingLike){
            likeable.likes.pull(existingLike._id);
            likeable.save();
            existingLike.remove();
            deleted  = true;
        }
        else{
            // make a new like
            let newLike = await LIke.create({
                user:req.user._id,
                likeable:req.query.id,
                
                 onModel:req.query.type   
            });
            likeable.likes.push(newLike._id);
            likeable.save();
        }
        return res.redirect('back');
       
        // return res.status(200).json({
        //     message:"request Successfull",
        //     data:{
        //         deleted:deleted
        //     }
        // })
    }
    catch(err){
        if(err)
        {
            console.log(err);
            return res.status(500).json({
                message:"Internal Server Error"
            })
        }
    }
}