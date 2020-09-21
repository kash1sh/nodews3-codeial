const express = require('express');

const router = express.Router();
const FriendsController = require('../controllers/friends_controller');

router.post('/change/:id',FriendsController.createFriensdhip);
// router.get('/list',L);  

module.exports = router;
