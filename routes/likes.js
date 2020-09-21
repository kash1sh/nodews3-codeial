const express = require('express');

const router = express.Router();

const LikesController = require('../controllers/likes_controller');

router.get('/toggle',LikesController.ToggleLike);  

module.exports = router;
