const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');

const {requireAuth, checkCurrentUser} = require('../middlewares/authMiddleware');

router.get('/signup', authController.signup_get);
router.post('/signup', authController.signup_post);
router.get('/login', authController.login_get);
router.post('/login', authController.login_post);
router.get('/logout', authController.logout);

router.get('/', requireAuth, checkCurrentUser, (req, res)=>{
    res.render('index', {title: "test"});
});

module.exports = router;