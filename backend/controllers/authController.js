const User = require('../models/user');
const jwt = require('jsonwebtoken');
const crypto = require("crypto");
require('dotenv').config({ path: './.env'} );
const {sendVerificationEmail} =require("../utils/sendVerificationMail");

/*****functions******/

// create jwt token
const maxAge = 1*24*60*60; //1 day in seconds
const createToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET_JWT, {
        expiresIn:maxAge
    });
}

// handle signup and login errors
const handleErrors = (err) =>{
    //console.log(err);
    let errors = {email: '', password: '', username: ''};

    //incorrect email or password during the login
    if(err.message=='incorrect login'){
        errors.password = 'Adresse e-mail ou mot de passe incorrect. Veuillez réessayer.'
    }

    //duplicated email error code during registration
    if(err.code===11000){
        if(Object.keys(err.keyValue)[0]=='username'){
            errors.username = "Ce nom d'utilisateur est déjà utilisé.";
        }

        if(Object.keys(err.keyValue)[0]=='email'){
            errors.email = 'Cet adresse e-mail a déjà été enregistré.';
        }
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
    res.render('authentification/signup', {
        title: "Créer un compte", 
        stylesheet: 'authentification/signup',
        script: "authentification/signup"
    });
}

module.exports.signup_post = async (req, res)=>{
    const {email, username, password} = req.body;

    try{
        const user = await User.create({ 
            email,
            username,
            password,
            emailToken: crypto.randomBytes(64).toString("hex")
        });

        sendVerificationEmail(user);

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
    res.render('authentification/login', {
        title: "Se connecter", 
        stylesheet: "authentification/login", 
        script: "authentification/login"
    });

}

module.exports.login_post = async (req, res)=>{
    const {email, password} = req.body;
    try{
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge*1000 });
        res.status(200).json({user: user._id});
    }
    catch(err){
        const errors = handleErrors(err);
        res.status(400).json({errors});
    }

}

module.exports.logout = (req, res)=>{
    res.clearCookie("jwt");
    res.redirect('/');
}


module.exports.verifyEmail = async (req, res) => {
    try{
        const emailToken = req.query.emailToken;

        if(!emailToken){

            return res.status(404).render('error', {title:"Page non trouvée", stylesheet: "error", error: '404'});
        }

        const user = await User.findOne({ emailToken });

        if(user){
            const update = { emailToken : null,
                isVerified : true };
            await user.updateOne( update);

            res.render('authentification/verifyEmail', {
                title: "Vérification de l'email...", 
                stylesheet: "authentification/verifyEmail", 
                script: "authentification/verifyEmail",
            });

        }
        else{
            res.status(404).render('error', {
                title:"Page non trouvée",
                stylesheet: "error",
                error: '404'
            }); 
        }

    } 
    catch(err){
        console.log(err);
        res.status(500).render('error', {
            title:"Erreur de service interne",
            stylesheet: "error",
            error: '500'
        });
    }
}