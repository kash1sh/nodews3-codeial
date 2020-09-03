const express = require('express');
const passport = require('passport');
const router = express.Router();

const postsController = require('../controllers/posts_controllere');

router.post('/create',passport.checkAuthentication,postsController.created);
router.get('/destroy/:id',passport.checkAuthentication,postsController.destroy);
module.exports=router;