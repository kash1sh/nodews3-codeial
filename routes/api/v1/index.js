const express = require('express');
// const { route } = require('../..');

const router = express.Router();
router.use('/posts',require('./posts')); 
router.use('/users',require('./users'));    

module.exports = router;