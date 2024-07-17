const express = require('express');
const router = express.Router();

const curiosityController = require('../controllers/curiosityController');

const {requireAuth, _} = require('../middlewares/authMiddleware');

router.get('/', /*requireAuth,*/ curiosityController.curiosityHome);

module.exports = router;