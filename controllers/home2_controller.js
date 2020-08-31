const ITems = require('../models/items');
module.exports.home2 = function(req,res){
    // console.log(req.cookies);
    // res.cookie('user_id',25);
    ITems.find({},function(err,items){
        if(err){
            console.log(`error in fetching contacts from db`);
            return;
        }

      return res.render('home2',
    {
        title:"To Do App",
        // list_items:items
    })
    })
    
}