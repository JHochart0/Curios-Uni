const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');

const {requireAuth, _, __} = require('../middlewares/authMiddleware');

router.get('/signup', authController.signup_get);
router.post('/signup', authController.signup_post);
router.get('/login', authController.login_get);
router.post('/login', authController.login_post);
router.get('/logout', authController.logout);
router.get('/email-request', requireAuth, authController.emailVerificationRequest)
router.get('/verify-email', authController.verifyEmail);

module.exports = router;