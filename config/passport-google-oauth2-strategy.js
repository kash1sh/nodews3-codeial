const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const USer = require('../models/user');

passport.use(new googleStrategy({
    clientID : '402035647186-ptcb59miuc7nk7iu876ankhvm8gco24h.apps.googleusercontent.com',
    clientSecret : 'RGn12Bnq9JwSOZ8Yk4WELbMX',
    callbackURL: 'http://localhost:8000/auth/google/callback'
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