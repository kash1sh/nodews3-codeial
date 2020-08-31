const USer=require('../models/user');

module.exports.new_profile = function(req,res){

    return res.render('user_profile',{
    title:"Sarkaar"
    }
    );
}
// render the sign out page
module.exports.signUp = function(req,res){

    if(req.isAuthenticated()){
       return res.redirect('/profile'); /*Change*/
    }
        return res.render('user_sign_up',{
            title:"Codeial | Sign Up"   
        });
}
// render the sign in page
module.exports.signIn = function(req,res){
    if(req.isAuthenticated()){
        // so that if i am once signed in i dont have to sign in again
       return res.redirect('/profile'); /*Change*/
    }
    return res.render('user_sign_in',{
        title:"Codeial | Sign In"   
    });
}
// get the sign up data
module.exports.create = function(req,res){
    if(req.body.password != req.body.confirm_password)
    {return res.redirect('back');}

    USer.findOne({email:req.body.email},function(err,user){
        if(err){
        console.log('error in finding sign up page');
        return;
        }

        if(!user)
        {
            USer.create(req.body, function(err,user){
                if(err)
                {
                    console.log('error in creating user while signing up')
                    return;
                }
                return res.redirect('/sign-in');
            })
        }
        else{
            return res.redirect('back');
        }
    });

};

// sign in to create a session
module.exports.createSession = function(req,res){
    return res.redirect('/profile');
}
module.exports.destroySession = function(req,res){
    req.logout();
    return res.redirect('/')
}