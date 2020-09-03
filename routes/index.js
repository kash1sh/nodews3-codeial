const express = require('express');

const router = express.Router();

// router.use('/users',require('./users'));
router.use(express.static('assets'));
const ITems = require('../models/items');
const db=require('../config/mongoose');

const home2Controller = require('../controllers/home2_controller');
const homeController = require('../controllers/home_controller');
const userController = require('../controllers/users_controller');
const deleteController=require('../controllers/delete_controller');

console.log('router loaded');

router.get('/',homeController.home);
router.use(express.urlencoded());
router.get('/posts/second',home2Controller.home2);


router.post('/create-item',userController.profile);

router.get('/delete-item',deleteController.dele);

module.exports = router;    