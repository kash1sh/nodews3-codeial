const ITems = require('../models/items');
module.exports.home = function(req,res){

    ITems.find({},function(err,items){
        if(err){
            console.log(`error in fetching contacts from db`);
            return;
        }

      return res.render('home',
    {
        title:"To Do App",
        list_items:items
    })
    })
    
}