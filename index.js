const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port=8000;


app.use(express.urlencoded());
// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const passportgoogle = require('./config/passport-google-oauth2-strategy');

const expressLayouts = require('express-ejs-layouts');
const { db } = require('./models/user');

const MongoStore = require('connect-mongo')(session);
const sassMiddleware = require('node-sass-middleware');

const flash =  require('connect-flash');
const customMware = require('../codeial/config/middleware');
// setting up the chat server to be used with socket.io 
const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log(`Chat server is listening on port ${port}`); 

// 
app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug:true,
    outputStyle:'extended',
    prefix:'/css'
}))
app.use(expressLayouts);

app.use(express.static('./assets'));


app.use(cookieParser());
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


app.set('view engine','ejs');

app.set('views','./views'); 

// mongo store is used to store the seeion cookie in the db
app.use(session({
    name:'codeial',
    // TODO:    change the secret 
    secret:'blahdsomething',
    saveUninitialized :false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store:new MongoStore({
            mongooseConnection: db,
            autoRemove:'disabled'
        },

        function(err)
        {
            console.log(err || 'connect-mongodb setup ok'); 
        }
    )   

}));
app.use(passport.initialize());

app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);
// use express router
app.use('/',require('./routes/index'));
app.use('/',require('./routes/users'));
app.use('/posts',require('./routes/posts'));
app.use('/comments',require('./routes/comments'));
app.use('/uploads',express.static(__dirname+'/uploads'));
// app.use('/likes',require('./routes/likes'));

app.listen(port,function(err){
    if(err)
    {
        console.log(`Error is ${err}`);
        return;
    }
    console.log(`Server is running on port ${port}`);

});