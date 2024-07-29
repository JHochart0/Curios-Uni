const nodemailer = require("nodemailer");
require('dotenv').config({ path: './.env'} );

const createMailTransporter = () =>{
    const transporter = nodemailer.createTransport({
        service: "hotmail",
        auth: {
            user: process.env.EMAIL_IDENTIFIER,
            pass: process.env.EMAIL_PASSWORD
        }
    });
    
    return transporter;
}

module.exports = {createMailTransporter};