const express = require('express');

const router = express.Router();
router.use(express.static('assets'));
const db=require('../config/mongoose');
router.use(express.urlencoded());
const usersController = require('../controllers/new_user_controller');


router.get('/profile',usersController.new_profile);
router.get('/sign-up',usersController.signUp);
router.get('/sign-in',usersController.signIn);

router.post('/create',usersController.create)
module.exports=router;