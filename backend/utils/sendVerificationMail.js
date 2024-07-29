const { createMailTransporter } = require("./createMailTransporter");
require('dotenv').config({ path: './.env'} );
const ejs = require('ejs');

const sendVerificationEmail = (user) => {
    const transporter = createMailTransporter();

    ejs.renderFile('./views/templates/verificationEmail.ejs', { user, client_url : process.env.CLIENT_URL }, (err, data) => {
        if(err){
            console.log(err);
        }
        else{
            const mailOptions = {
                from: `"Curios'Uni" <${process.env.EMAIL_IDENTIFIER}>`,
                to: user.email,
                subject : "Vérifiez votre adresse email...",
                html: data,
                attachments: [{
                    filename: 'logo-email.png',
                    path:'./public/img/logo-email.png',
                    cid:'logo'

                }]
            };

            transporter.sendMail(mailOptions, (error, info) =>{
                if(error){
                    console.log(error);
                }
                else{
                    console.log(`Verification email sent to ${user.email}`);
                }
            });
        }
    });
};

module.exports = {sendVerificationEmail};