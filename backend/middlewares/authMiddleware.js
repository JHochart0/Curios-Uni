const jwt = require('jsonwebtoken');
require('dotenv').config({ path: './.env'} );


const User = require('../models/user');

// middleware to check if the user is currently connected or not
const requireAuth=(req, res, next) =>{

}

// middleware to check who is the current user connected
const checkCurrentUser= (req, res, next) =>{
    
}

module.exports = {requireAuth, checkCurrentUser};