
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
            window.location.href = "vendor3.html";
            // window.setTimeout(function(){
            //     // Move to html.index after 2 seconds
            //     window.location.href = "vendor2.html";
            //   }, 2000);
            //reset form
            loginForm.reset();
            // loginForm.querySelector('.error').innerHTML = '';
        }).catch(err => {
            toast('error',"Invalid email or password.");
            // loginForm.querySelector('.error').innerHTML = err.message;
    });
    }    
});