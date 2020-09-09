const passport = require('passport');
const USer = require('../models/user');

const LocalStrategy = require('passport-local').Strategy;

// Authentication using passport
passport.use(new LocalStrategy({
    usernameField:'email',
    passReqToCallback:true
},
    function(req,email,password,done){
        // find a user and establish the identity
        USer.findOne({email:email},function(err,user){
            if(err)
            {
                // console.log('Error in finding user -->Passport.js');
                req.flash('error',err);
                return done(err);
            }
            if(!user || user.password!=password)
            {
                // console.log('Invalid username/PAssword');
                req.flash('error','Invalid Username/Password');
                return done(null,false);
            }
            return done(null,user);
        });
    }
    ));

// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user,done){
    done(null,user.id);
})


// deserializing the user from the key in the cookies
passport.deserializeUser(function(id,done){
    USer.findById(id,function(err,user){
        if(err)
        {
            console.log('Error in finding user -->Passport.js');
            return done(err);
        }
        return done(null,user);
    })
})
// check if the user is authenticated
passport.checkAuthentication = function(req,res,next){
    // if user is signed in,then pass the request to NEXT which is controller's action
    if(req.isAuthenticated()){
        return next();
    }
    // if user not signed in
    return res.redirect('/sign-in');/*Change*/

}

passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated())
    {
        // req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
        res.locals.user = req.user;
        
    }
    next();
}
module.exports = passport;  