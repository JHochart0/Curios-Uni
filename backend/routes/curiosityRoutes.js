const express = require('express');
const router = express.Router();

const curiosityController = require('../controllers/curiosityController');

const {requireAuth, requireEmailVerified, _} = require('../middlewares/authMiddleware');

router.get('/', requireAuth, requireEmailVerified, curiosityController.curiosityHome);

module.exports = router;