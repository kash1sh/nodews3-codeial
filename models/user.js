const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/uploads/users/avatars');
const uschema = new mongoose.Schema({
    email :{
        type:String,
        required:true,
        unique:true
    } ,
    password :{
        type:String,
        required:true,
        
    },
    name : {
        type:String,
        required:true
    },
    avatar : {
        type: String
    }

}, {
    timestamps:true
});

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'..',AVATAR_PATH));
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now());
    }
  });

//   static function
uschema.statics.uploadedAvatar = multer({storage:storage}).single('avatar');
uschema.statics.avatarPath = AVATAR_PATH;

const USer = mongoose.model('USer',uschema);
module.exports = USer;