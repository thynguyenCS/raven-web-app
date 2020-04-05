
/**********SIGNIN **************/
const loginForm = document.querySelector('#login-form');
const loginButton = document.getElementById('login-button');
var isLoginOk = false;

loginButton.addEventListener('click', (e) => {
    if (isEmailValid('login-email') && isLoginPasswordValid('login-password')){
        isLoginOk = true;
    }else{
    }
});

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (isLoginOk){
        const email = loginForm['login-email'].value;
        const password = loginForm['login-password'].value;  
        // log the user in
        auth.signInWithEmailAndPassword(email, password).then((cred) => {
            // display connfirm msg
            success("Signed in successfully");
            window.setTimeout(function(){
                // Move to html.index after 2 seconds
                window.location.href = "vendor.html";
              }, 2000);
            //reset form
            loginForm.reset();
            // loginForm.querySelector('.error').innerHTML = '';
        }).catch(err => {
            error("Invalid email or password.");
            // loginForm.querySelector('.error').innerHTML = err.message;
    });
    }    
});