const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {isEmail} = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new Schema ({
    email: {
        type: String,
        required: [true, 'Veuillez saisir une adresse email.'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Veuillez saisir une adresse email valide.']
    },

    username: {
        type: String,
        required: true,
        unique: true,
        minlength: [4, "Le nom d'utilisateur doit être de 4 caractères minimum."],
        maxlength: [16, "Le nom d'utilisateur ne doit pas dépasser 16 caractères."],
        validate(value){
            //checking if it has a special character
            if ( /\W+/.test(value) ){
                throw new Error("Le nom d'utilisateur ne doit pas contenir de caractères spéciaux.");
            }
        }
    },
    
    password: {
        type: String,
        required: [true, 'Veuillez saisir un mot de passe.'],
        minlength: [8, 'Le mot de passe doit être de 8 caractères minimum.'],
        maxlength: [50, 'Le mot de passe ne doit pas dépasser 50 caractères.'],
        //checking if the password has at least a number, a small letter, a capital letter and a special character
        validate(value){
            let errors = [];
            // checking if it has a small letter
            if( !/[a-z]+/.test(value) ){
                errors.push('Le mot de passe doit contenir au moins 1 lettre minuscule.');
            }
            // checking if it has a capital letter
            if( !/[A-Z]+/.test(value) ){
                errors.push('Le mot de passe doit contenir au moins 1 lettre majuscule.');
            }
            //checking if it has a number
            if( !/\d+/.test(value) ){
                errors.push('Le mot de passe doit contenir au moins 1 chiffre.');
            }
            //checking if it has a special character
            if ( !/\W+/.test(value) ){
                errors.push('Le mot de passe doit contenir au moins 1 caractère spécial.');
            }
            //throwing the errors if there are ones
            if (errors.length > 0){
                throw new Error(errors);
            }
        }
    },

    emailToken: {
        type: String
    },

    isVerified: {
        type: Boolean,
        default: false
    }

});

// fire a function before doc saved to db
userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// static method to login a user
userSchema.statics.login = async function(email, password){
    const user = await this.findOne({ email });
    if(user){
        const auth = await bcrypt.compare(password, user.password);
        if(auth) return user;
        
    }
    
    throw Error('incorrect login');
}


const User = mongoose.model('User', userSchema);
module.exports = User;