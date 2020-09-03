const express = require('express');
const passport = require('passport');
const router = express.Router();
router.use(express.static('assets'));
const db = require('../config/mongoose');
router.use(express.urlencoded());
const usersController = require('../controllers/new_user_controller');

router.get(
  '/profile/:id',
  passport.checkAuthentication,
  usersController.new_profile,
);

//************add by TA *********/
router.get('/profile', passport.checkAuthentication, usersController.profile);
/*********************** */
router.post(
  '/profile/:id',
  passport.checkAuthentication,
  usersController.update,
);
router.get('/sign-up', usersController.signUp);
router.get('/sign-in', usersController.signIn);
router.get('/sign-out', usersController.destroySession);

router.post('/create', usersController.create);

// use passport as a middleware
router.post(
  '/create-session',
  passport.authenticate('local', { failureRedirect: '/sign-in' } /*Change*/),
  usersController.createSession,
);
module.exports = router;