
/**********SIGN UP **************/
const signupForm = document.getElementById('signup-form');
const signupButton = document.getElementById('signup-button');
var isSignupOk = false;

// check all input fieds each time user clicks "Sign up"
// "click" event triggers validation immediately, while "submit" does not
// therefore we need to handle each event differently
signupButton.addEventListener('click', (e) => {
  
  if (isNameValid('signup-name') && isEmailValid('signup-email') 
    && isPasswordValid('signup-password')){
     isSignupOk = true;
  }else {
    isSignupOk = false;
  }
}); 

// Once all inputs are valid, register user credential to firebase
signupForm.addEventListener('submit', (e)=>{
  e.preventDefault(); // prevent form from submitting
  if (isSignupOk){
        const email = signupForm['signup-email'].value
        const pw = signupForm['signup-password'].value
        // console.log( email + " " + pw)
        auth.createUserWithEmailAndPassword(email, pw).then(cred=>{
          return db.collection('users').doc(cred.user.uid).set({
            displayName: signupForm['signup-name'].value
          }).then(()=>{ 
            // display confirm message
            document.getElementById('signup-body').style.display = 'none';
            document.getElementById('signup-action').style.display = 'none';
            displayToast(`Signed up successfully. Please check your email for verification <i class="fas fa-check-circle green"></i> `);     
            document.getElementById('signup-form').reset();
            window.setTimeout(function(){
              // Move to html.index after 2 seconds
              window.location.href = "index2.html";
            }, 3000);
            // document.getElementById('signup-form').reset();
          });       
        }).catch(err => {
          displayToast("This user already exists.");
        })
  }
});



