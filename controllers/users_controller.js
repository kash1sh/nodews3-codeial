const ITems = require('../models/items');
module.exports.profile = function(req,res){
    
    ITems.create({
        description:req.body.description,
        category:req.body.category,
        date:req.body.date
    },function(err,newContact){
        if(err)
        {
            console.log('error in crrating a contact');
            return;
        }
        console.log('********',newContact);
        res.redirect('back');
    
    
});
}
