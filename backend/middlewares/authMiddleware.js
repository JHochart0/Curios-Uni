const jwt = require('jsonwebtoken');
require('dotenv').config({ path: './.env'} );


const User = require('../models/user');

// middleware to force the user to be connected on the page
const requireAuth=(req, res, next) =>{
    const token = req.cookies.jwt;

    //check json web token exists & is verified
    if(token){
        jwt.verify(token, process.env.SECRET_JWT, (err, decodedToken)=>{
            if(err){
                console.log(err.message);
                res.redirect('/login');
            }
            else{
                next();
            }
        });
    }
    else{
        res.redirect('/login');
    }
}


//middleware to force the user to have his email verified on the page
// !! needs to be called after requireAuth imperatively !!
const requireEmailVerified= async (req, res, next) =>{
    const user = res.locals.user;
    if(!user.isVerified){
        res.redirect('/login'); // a changer avec la page "aller vérifier son compte"
    }
    else{
        next();
    }
    
}

// middleware to check who is the current user connected and give to the page the informations of the user
const checkCurrentUser= (req, res, next) =>{
    const token = req.cookies.jwt;

    if(token){
        jwt.verify(token, process.env.SECRET_JWT, async (err, decodedToken)=>{
            if(err){
                console.log(err.message);
                delete res.locals.user;
                next();
            }
            else{
                let user = await User.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        });
    }
    else{
        delete res.locals.user;
        next();
    }
}

module.exports = {requireAuth, requireEmailVerified, checkCurrentUser};