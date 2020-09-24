const passport = require('passport');
const JWTStrategy  = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const env = require('./environment');

const USer = require('../models/user');

let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: env.jwt_secret
}


passport.use(new JWTStrategy(opts,function(jwtPayLoad,done)
{
    USer.findById(jwtPayLoad._id,function(err,user){
        console.log("payload jwt : ",jwtPayLoad._id);
        if(err){
            console.log('Error in finding the user from JWT');
            return done(err,false);
        }

        if(user){
            return done(null,user);
        }
        else{
            return done(null,false);
        }
    })
})) ;


module.exports = passport;