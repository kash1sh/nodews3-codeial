// const ITems = require('../models/items');
// module.exports.home2 = function(req,res){
//     // console.log(req.cookies);
//     // res.cookie('user_id',25);
//     ITems.find({},function(err,items){
//         if(err){
//             console.log(`error in fetching contacts from db`);
//             return;
//         }

//       return res.render('home2',
//     {
//         title:"kuch nahi",
//          list_items:items
//     })
//     })
    
// }
const USer = require('../models/user');
const POst = require('../models/post');
module.exports.home2 = function(req,res){
    POst.find({})
    .populate('user')
    .populate({
        path:'comment',
        populate: {
            path : 'user'
        }
    })
    .exec(function(err,posts){
        USer.find({},function(err,users){
            return res.render('home2',{
                title:"Codeial | Home2",
                posts :posts,
                all_users:users
            });     
        })
       
    })
}