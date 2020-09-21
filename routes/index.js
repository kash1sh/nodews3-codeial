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
const { route } = require('./api');

console.log('router loaded');

router.get('/',homeController.home);
router.use(express.urlencoded());
router.get('/posts/second',home2Controller.home2);
router.use('/api',require('./api'));

router.post('/create-item',userController.profile);

router.get('/delete-item',deleteController.dele);
router.use('/likes',require('./likes'));
router.use('/friend',require('./friends'));

module.exports = router;    