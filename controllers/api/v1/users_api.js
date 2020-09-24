const USer = require('../../../models/user');
const jwt = require('jsonwebtoken');
const env = require('../../../config/environment');

module.exports.createSession = async function (req, res) {
    // req.flash('success','Logged in Successfully');
    //   return res.redirect('/profile');  
    try{
        let user = await USer.findOne({email:req.body.email});
        if(!user || user.password != req.body.password){
            return res.status(422).json({
                message:"Invalid Username and/or Password"
            })
        }
        return res.status(200).json({
            message:'Sign in Successful, here is your token, please keep it safe',
            data : {
                token:jwt.sign(user.toJSON(),env.jwt_secret,{expiresIn: '100000'})
            }
        })
    }
    catch(err){
        console.log('Error in api-jwt',err);
        return res.status(500).json({
            message:'Internal Server Error'
        })
    }
    };