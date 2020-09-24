const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const USer = require('../models/user');
const env = require('./environment');

passport.use(new googleStrategy({
    clientID : env.google_client_ID,
    clientSecret : env.google_client_Secret,
    callbackURL: env.google_callback_URL
},

function(accessToken,refreshToken,profile,done){
    USer.findOne({email:profile.emails[0].value}).exec(function(err,user){
        if(err){
            console.log('error in google strategy-passport',err);
            return;
        }
        console.log(profile);
        console.log(accessToken,refreshToken);

        if(user){
            // if found, set as req.user
            return done(null,user);
        }
        else{
            // if not found,create/sign-up a new user and set as req.user
            USer.create({
                name:profile.displayName,
                email:profile.emails[0].value,
                password:crypto.randomBytes(20).toString('hex')
            },
            function(err,user){
                if(err)
                {
                    console.log('error in google strategy-passport',err);
                    return;
                }
                return done(null,user);
            }
            )
        }
    })
}
));

module.exports = passport;