const form = document.querySelector('#signup-form');
const emailError = document.querySelector('#email-error');
const usernameError = document.querySelector('#username-error');
const passwordError = document.querySelector('#password-error');

form.addEventListener('submit', async (e)=>{
    e.preventDefault();
    
    //reset errors
    emailError.textContent = "";
    usernameError.textContent = "";
    passwordError.textContent = "";

    //get the values
    const email = form.email.value;
    const username = form.username.value;
    const password = form.password.value;
    

    try{
        const res = await fetch('/signup', {
            method: 'POST',
            body: JSON.stringify({email, username, password}),
            headers: {'Content-Type': 'application/json'}
        })
        
        const data = await res.json();
            
        if (data.errors){

            emailError.textContent = data.errors.email;
            usernameError.textContent = data.errors.username;

            const passwordMustContain = data.errors.password.split(',');
            let passwordErrorMessage = "";
            for(let i=0; i<passwordMustContain.length; i++){
                passwordErrorMessage=passwordErrorMessage.concat(passwordMustContain[i], " \n ");
            }

            passwordError.textContent = passwordErrorMessage;
            passwordError.innerHTML=passwordError.innerHTML.replaceAll('\n', '<br/>');
            
            
        }
        if(data.user){
            location.assign('/email-request');
        }
        
    }
    catch(err){
        console.log(err);
    }
})
