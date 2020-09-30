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
try{
    module.exports.home2 = async function(req,res){
        let posts = await POst.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path:'comment',
            populate: {
                path : 'user likes'   // <-- isse kaam ho jaega,ok got iSt
            }
        }).populate('likes');
        
        let users = await USer.find({});
    
                    return res.render('home2',{
                    title:"Codeial | Home2",
                    posts :posts,
                    all_users:users
                });     
            
           
        
    }
}
catch(err){
    conssole.log('Error :', err);

}
