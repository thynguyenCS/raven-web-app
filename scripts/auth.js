  // listen for auth status changes
auth.onAuthStateChanged(user => {
  if (user) {
    console.log('user logged in: ', user);
                                                          //need to change guides to vendors
    db.collection('guides').onSnapshot(snapshot => {
      setupVendors(snapshot.docs);
      setupUI(user);
    }, err => console.log(err.message));
  } else {
    console.log('user logged out');
    setupUI();
    setupVendors([]);
  }
})

// create new vendor
const createForm = document.querySelector('#create-form');
createForm.addEventListener('submit', (e) => {
  e.preventDefault();
                                                          //need to change guides to vendors
  db.collection('guides').add({
    name: createForm.title.value,
    city: createForm.content.value
  }).then(() => {
    // close the create modal & reset form
    const modal = document.querySelector('#modal-create');
    M.Modal.getInstance(modal).close();
    createForm.reset();
  }).catch(err => {
    console.log(err.message);
  });
});

  // signup
  const signupForm = document.querySelector('#signup-form');
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // get user info
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;

    var acceptList = [ "sjsu.edu" ];
    //var emailValue = email; // To Get Value (can use getElementById)
    var splitArray = email.split('@'); // To Get Array

    if(acceptList.indexOf(splitArray[1]) >= 0)
    {
      // Means it has the rejected domains
      //return true;
        // sign up the user
        
        auth.createUserWithEmailAndPassword(email, password).then(cred => {
          return db.collection('users').doc(cred.user.uid).set({
            username: signupForm['user-name'].value
          });
        }).then(() => {
          // close the signup modal & reset form
          const modal = document.querySelector('#modal-signup');
          M.Modal.getInstance(modal).close();
          signupForm.reset();
          signupForm.querySelector('.error').innerHTML = '';
          }).catch(err => {
            signupForm.querySelector('.error').innerHTML = err.message;
          });
        }

  });

  // logout
  const logout = document.querySelector('#logout');
  logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut();
  });
  
  // login
  const loginForm = document.querySelector('#login-form');
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // get user info
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;
  
    // log the user in
    auth.signInWithEmailAndPassword(email, password).then((cred) => {
        // close the signup modal & reset form
        const modal = document.querySelector('#modal-login');
        M.Modal.getInstance(modal).close();
        loginForm.reset();
        loginForm.querySelector('.error').innerHTML = '';
      }).catch(err => {
        loginForm.querySelector('.error').innerHTML = err.message;
  });
  
  });