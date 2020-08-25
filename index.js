const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port=8000;

const expressLayouts = require('express-ejs-layouts');

app.use(expressLayouts);

app.use(express.static('./assets'));

app.use(express.urlencoded());
app.use(cookieParser());

// use express router
app.use('/',require('./routes/index'));
app.use('/',require('./routes/users'));
app.set('view engine','ejs');

app.set('views','./views'); 

app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

app.listen(port,function(err){
    if(err)
    {
        console.log(`Error is ${err}`);
        return;
    }
    console.log(`Server is running on port ${port}`);

});