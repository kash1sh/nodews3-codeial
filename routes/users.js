const express = require('express');

const router = express.Router();
const usersController = require('../controllers/new_user_controller');
module.exports=router;

router.get('/profile',usersController.new_profile)