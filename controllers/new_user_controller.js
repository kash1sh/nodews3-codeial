const USer = require('../models/user');
const path = require('path');
const fs = require('fs');

module.exports.new_profile = function (req, res) {
  USer.findById(req.params.id, function (err, user) {
    return res.render('user_profile', {
      title: 'edsaf',
      profile_us: user,
    });
  });
};
//************add by TA *********/
module.exports.profile = function (req, res) {
  USer.findById(req.user.id, function (err, user) {
    // actually ye pehle theek chal raha tha , jab maine file ka part daala tabhi id of null dikha raha hai..es let me see once
    console.log("profile user" , user);
    return res.render('user_profile', {
      title: 'edsaf',
      profile_us: user,
    });
  });
};
//************************* */

module.exports.update = async function (req, res) {
  if (req.user.id == req.params.id) {
    // USer.findByIdAndUpdate(req.params.id, req.body, function (err, user) {
    //   return res.redirect('back');
    // });
    try{
    let user = await USer.findById(req.params.id);
    USer.uploadedAvatar(req,res,function(err){
      if(err){console.log('Multer Error:',err)
    // return;
    }
    user.name = req.body.name;
    user.email = req.body.email;

    if(req.file){
      if(user.avatar){
        fs.unlinkSync(path.join(__dirname,'..',user.avatar) );
      }
      user.avatar = USer.avatarPath + '/' + req.file.filename;
    }
    user.save();
    return res.redirect('back');

      console.log(req.file);
    })
    }
    catch(err){
      req.flash('error',err);
      return res.redirect('back');
    }
  } else {
    return res.status(401).send('Unauthorized');
  }
};
// render the sign out page
module.exports.signUp = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect('/profile'); /*Change*/
  }
  return res.render('user_sign_up', {
    title: 'Codeial | Sign Up',
  });
};
// render the sign in page
module.exports.signIn = function (req, res) {
  if (req.isAuthenticated()) {
    // so that if i am once signed in i dont have to sign in again
    return res.redirect('/profile/:id'); /*Change*/
  }
  return res.render('user_sign_in', {
    title: 'Codeial | Sign In',
  });
};
// get the sign up data
module.exports.create = function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    return res.redirect('back');
  }

  USer.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log('error in finding sign up page');
      return;
    }

    if (!user) {
      USer.create(req.body, function (err, user) {
        if (err) {
          console.log('error in creating user while signing up');
          return;
        }
        return res.redirect('/sign-in');
      });
    } else {
      return res.redirect('back');
    }
  });
};
// sign in to create a session
//*****************changed by TA************* */
module.exports.createSession = function (req, res) {
  req.flash('success','Logged in Successfully');
    return res.redirect('/profile');  
  };
  module.exports.destroySession = function (req, res) {
    req.logout();
    req.flash('success','Logged out Successfully');
    return res.redirect('/');
  };
