/******LOG OUT ********/
const logoutButton = document.getElementById('logout-button');
logoutButton.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut();
    window.location.href = "index2.html";
});

/******ADD VENDOR ********/
const signupForm = document.getElementById('signup-form');
const signupButton = document.getElementById('signup-button');

  // Once all inputs are valid, register user credential to firebase
  signupForm.addEventListener('submit', (e)=>{
    e.preventDefault(); // prevent form from submitting
    db.collection('vendors').add({
        name: signupForm.name.value,
        location: signupForm.loc.value,
        category: signupForm.cat.value,
        logo: "img/ravenCircle.png"

      }).then(() => {
        //reset form
        signupForm.reset();
        console.log("success");
      }).catch(err => {
        console.log(err.message);
      });
    });

