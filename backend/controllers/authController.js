const User = require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: './.env'} );

/*****functions******/

// create jwt token
const maxAge = 1*24*60*60; //1 day in seconds
const createToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET_JWT, {
        expiresIn:maxAge
    });
}

// handle signup and login errors (NEED TO COMPLETE IT WHEN I FINISH THE USER MODEL)
const handleErrors = (err) =>{
    let errors = {email: '', password: ''};

    //incorrect email or password during the login
    if(err.message=='incorrect login'){
        errors.password = 'Incorrect email or password. Try again.'
    }

    //duplicated email error code during registration
    if(err.code===11000){
        errors.email = 'That email is already registered.'
        return errors;
    }

    //validation errors
    if (err.message.includes('User validation failed')){
        Object.values(err.errors).forEach( ({properties}) => {
            errors[properties.path] = properties.message;
        });
    }

    return errors;
}


/*****routes functions******/

module.exports.signup_get = (req, res)=>{
    res.render('authentification/signup', {title: "Créer un compte", stylesheet: 'authentification/signup'});
}

module.exports.signup_post = async (req, res)=>{
    const {email, password, username} = req.body;
    try{
        const user = await User.create({ email, password, username });
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge*1000 });
        res.status(201).json({user: user._id});
    }
    catch(err){
        const errors = handleErrors(err);
        res.status(400).json({errors});
    }
}


module.exports.login_get = (req, res)=>{
    res.render('authentification/login', {title: "Se connecter", stylesheet: "authentification/login"});

}

module.exports.login_post = async (req, res)=>{
    res.send('login post');

}

module.exports.logout = (req, res)=>{
    res.cookie('jwt', '', {maxAge: 1});
    res.redirect('/');
}