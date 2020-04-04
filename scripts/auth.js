//listen for auth status changes
// auth.onAuthStateChanged(user => {
//   if (user) {
//     console.log('user logged in: ', user);
//     // //need to change guides to vendors
//     // db.collection('guides').onSnapshot(snapshot => {
//     //   setupVendors(snapshot.docs);
//     //   setupUI(user);
//     // }, err => console.log(err.message));
//   } else {
//     console.log('user logged out');
//     //setupUI();
//     //setupVendors([]);
//   }
// })

// create new vendor
// const createForm = document.querySelector('#create-form');
// createForm.addEventListener('submit', (e) => {
//   e.preventDefault();
//                                                           //need to change guides to vendors
//   db.collection('guides').add({
//     name: createForm.title.value,
//     city: createForm.content.value
//   }).then(() => {
//     // close the create modal & reset form
//     const modal = document.querySelector('#modal-create');
//     M.Modal.getInstance(modal).close();
//     createForm.reset();
//   }).catch(err => {
//     console.log(err.message);
//   });
// });

  /**********LOG OUT**************/
  const logout = document.querySelector('#logout-form')
  logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut();
  });
  
  /**********LOG IN**************/
  // const loginForm = document.querySelector('#login-form');
  // loginForm.addEventListener('submit', (e) => {
  //   e.preventDefault();    
  //   const email = loginForm['login-email'].value;
  //   const password = loginForm['login-password'].value;  
  //   // log the user in
  //   auth.signInWithEmailAndPassword(email, password).then((cred) => {
  //       //reset form
  //       loginForm.reset();
  //       loginForm.querySelector('.error').innerHTML = '';
  //     }).catch(err => {
  //       loginForm.querySelector('.error').innerHTML = err.message;
  // });
  
  // });