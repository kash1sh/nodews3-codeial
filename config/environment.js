const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');

const logDirectory = path.join(__dirname,'../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access.log',{
    interval:'1d',
    path:logDirectory
});
const development = { //bro give me a sec i knoe how to fix this, bhai bas thoda jaldi meri 5 min mein class hai
    //bro tera pehle wala hogya ye  bhi btata hu
    name: 'development',
    asset_path:'/assets',
    session_cookie_key:'blahdsomething',
    db:'todo_db',
    smtp:{
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'gOPiBhabhi.LaptopLover',
            pass: 'cleanthelaptop'
        }
    },

    google_client_ID : '402035647186-ptcb59miuc7nk7iu876ankhvm8gco24h.apps.googleusercontent.com',
    google_client_Secret : 'RGn12Bnq9JwSOZ8Yk4WELbMX',
    google_callback_URL: 'http://localhost:8000/auth/google/callback',

    jwt_secret:'codeial',

    morgan: {
        mode: 'dev',
        options: {stream:accessLogStream}
    }

}

const production = {
    name:'production',/*Doubt*/
    asset_path:process.env.CODEIAL_ASSET_PATH,
    session_cookie_key:process.env.CODEIAL_SESSION_COOKIE_KEY,
    db:process.env.CODEIAL_DB,
    smtp:{
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.CODEIAL_GMAIL_USERNAME,
            pass: process.env.CODEIAL_GMAIL_PASSWORD
        }
    },

    google_client_ID : process.env.CODEIAL_GOOGLE_CLIENT_ID,
    google_client_Secret : process.env.CODEIAL_GOOGLE_CLIENT_SECRET,
    google_callback_URL: process.env.CODEIAL_GOOGLE_CALLBACK_URL,

    jwt_secret:process.env.CODEIAL_JWT_SECRET,
  
//raise karke phone kardena  9315563412
    morgan: {
        mode: 'combined',
        options: {stream:accessLogStream}
    }

}
// blahdsomething


module.exports = eval(process.env.CODEIAL_ENVIRONMENT)==undefined?development:eval(process.env.CODEIAL_ENVIRONMENT);   //bro why did u changed he code?
// original code pe bhi error aa raha tha, and sir ne kaha tha ki node_env thoda jyaada use hota hai har jagah, isliye
//restore the original ok please dont leave the doubt or be offline, s, ha 1 min bas
// wait ??listten bro 
//for environment variable to work in WINDOWS 10, you need to restart the PC, did u restarted after setting up NODE_ENV?
// nope, ek kaam karta hoo, original code likhta hoo, phir restart karta hoo, aap abhi doubt leave mat karna
// bro aapne sare variable store karwwa lie the? in ha bhaienr acah lets c restart , same error aa raha hai