const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/todo_db');

const db=mongoose.connection;

db.on('error',console.error.bind(console,'error connecrting to db'));

db.once('open',function(){
    console.log('Successfully connected to the database');
})