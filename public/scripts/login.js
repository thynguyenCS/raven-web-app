
/**********SIGNIN **************/
const loginForm = document.getElementById('login-form');
const loginButton = document.getElementById('login-button');
var isLoginOk = false;

loginButton.addEventListener('click', (e) => {
    if (isEmailValid('login-email') && isLoginPasswordValid('login-password')){
        isLoginOk = true;
    }else {
        isLoginOk = false;
    }
});

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (isLoginOk){
        const email = loginForm['login-email'].value;
        const password = loginForm['login-password'].value;  
        // log the user in
        auth.signInWithEmailAndPassword(email, password).then((cred) => {
            document.getElementById('error').style.display = 'none';
            loginForm.reset();
            window.setTimeout(function(){
                // Move to html.index after 2 seconds
                window.location.href = "vendor3.html";
              }, 1000);
            
        }).catch(err => {
            displayToast("Invalid email or password.");
            // loginForm.querySelector('.error').innerHTML = err.message;
    });
    }    
});