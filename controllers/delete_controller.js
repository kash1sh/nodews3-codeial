const ITems = require('../models/items');
const express = require('express');

const router = express.Router();

router.use(express.urlencoded());
module.exports.dele = function(req,res){

   let id = req.query.id;
   console.log(id);
   ITems.findByIdAndDelete(id,function(err){
       if(err){
           console.log('errror in deleting');
           return;
       }
       return res.redirect('back');
   });
}