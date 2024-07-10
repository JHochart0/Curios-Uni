const form = document.querySelector('#login-form');
const passwordError = document.querySelector('#password-error');

form.addEventListener('submit', async (e)=>{
    e.preventDefault();
    
    //reset errors
    passwordError.textContent = "";

    //get the values
    const email = form.email.value;
    const password = form.password.value;

    try{
        const res = await fetch('/login', {
            method: 'POST',
            body: JSON.stringify({email, password}),
            headers: {'Content-Type': 'application/json'}
        })
        
        const data = await res.json();
            
        if (data.errors){
            passwordError.textContent = data.errors.password;
        }
        if(data.user){
            location.assign('/');
        }
        
    }
    catch(err){
        console.log(err);
    }
})
