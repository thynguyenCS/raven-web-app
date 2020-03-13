//sign up
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // get user infor
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;

    //sign up the user
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        const modal = document.querySelector('#modal-signup');
        M.Modal.getInstance(modal).close();
        signupForm.reset();
    })
})
//logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut().then(() => {
        console.log('user sign out');
    })
})

//login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    //get user infor
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;
    auth.signInWithEmailAndPassword(email, password).then(cred => {
        console.log(cred.user);
        //close the modal and reset the form
        const modal = document.querySelector('#modal-login');
        M.Modal.getInstance(modal).close();
        signupForm.reset();
    })
})
