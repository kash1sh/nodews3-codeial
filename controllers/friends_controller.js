const USer = require('../models/user');
// const FRiendship = require('../models/friendship')

// module.exports.MyFriend = async function(req,res){
//     // /friend/change/profile.id
// try{
//     let present = false;
//     // let to_user;
//     let from_user;
//     from_user = req.user._id; // ye object nhi h yaaha = aaega
//     // ab yrr tum use kr rhe ho friendship schema but need nhi h uski , hum pending req implement nahi kr rhe toh hum apni confusion 
//     // bdha rhe h schema use krke ---- i think tum abhi simple implementation kr rhe ho na ki Add friend p click ho or vo friend bn jaye 
//     // ya kuch or socha h ? bhai mind mein toh yhi tha ki add friend pe click h aur friend ban jaaye, ek baar mai explain kar doo mera idea behind code
//     // phir aap bata dena, galtiyaa ok

//     // dekho, pehle jo schema hai vo toh sir ne bata diya tha
//     // ab mai ye chahta hoo, ki jaise maine apne naam se login kiya, ab meri profile id ke alaava baaki sab id pe mujhe ek add friend ka button
//     // dikhe, jispe agar mai click karoo, toh vo mera friend ho jaaye, and maine users ke schema mein ek friendship ka array daala hai, usme
//     // add kar doonga, so ab main bas controller mein check kar raha hoo, agar frien nahi hai, toh ye , usse naya banake, push kar raha 
//     // friendship mein, agar hai ,toh badhiya
//     // ye check kaha lgaya h ki vo already friend h ya nhi 
//     // agar vo friend hoga toh present true nahi hoga?
//     // bhai?
//     // lekin tumhara present toh by defualt false hih h, haa ye mujhe bhi lag raha tha, but koi aur method nahi dikha// nahi nahi ese 
//     // nahi hoga bilkul bhi ek kaam kro call kro 9711181457 pe
//     // bhai whatsapp call karloo, yaha network issue hai  haa 

//     // to_user:req.params.profile_us.id;
//     // bhai dekh rahi screen? haa

//     if(!present){
//                 present = true;

//         let newFriend = await FRiendship.create({
//             from_user:req.user._id,
//             to_user:req.params.profile_us._id
//         });
        
//         from_user.friendships.push(newFriend._id);
//         from_user.save();
//     }
//     return res.redirect('back');
// }
//     catch(err){
//         if(err)
//         {
//             console.log(err);
//             return res.status(500).json({
//                 message:"Internal Server Error"
//             })
//         }
//     }
// }

module.exports.createFriensdhip = async function (req, res) {

    try{
    let toUser = await USer.findById(req.params.id);
    let fromUser = await USer.findById(req.user.id);

    if(!fromUser.friendships.includes(req.params.id)){

        fromUser.friendships.push(req.params.id);
        fromUser.save();
        toUser.friendships.push(req.user.id);
        toUser.save();
    }
    else{
        req.flash('error', 'Friend Already Exists');
    }
    return res.redirect('back');

    }catch(err){
        console.log("Error in creating friends", err);
        return res.redirect('back');
    }
}

// module.exports.FriendProfile = function (req, res) {
//     USer.friendships.findById(req.user.id, function (err, user) {
     
//         if(req.xhr){
//                     return res.status(200).json({
//                         data:{
//                             friend_user:user,
//                         },
//                         message:"Friend Added"
//                     })
          
//             }
//       });
//   };