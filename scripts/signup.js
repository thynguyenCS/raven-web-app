
/**********SIGN UP **************/
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e)=>{
  e.preventDefault()
  const email = signupForm['signup-email'].value
  const pw = signupForm['signup-password'].value
  // console.log( email + " " + pw)
  auth.createUserWithEmailAndPassword(email, pw).then(cred=>{
    return db.collection('users').doc(cred.user.uid).set({
      displayName: signupForm['display-name'].value
    }).then(()=>{ 
      console.log('Successfully sign up')       
      document.getElementById('signup-form').reset()
    })       
  })
}) 
