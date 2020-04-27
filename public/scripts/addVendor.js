/******LOG OUT ********/
const logoutButton = document.getElementById('logout-button');
logoutButton.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut();
    window.location.href = "index.html";
});

/******ADD VENDOR ********/
const signupForm = document.getElementById('signup-form');
const signupButton = document.getElementById('signup-button');

  // Once all inputs are valid, register user credential to firebase
  signupForm.addEventListener('submit', (e)=>{
    e.preventDefault(); // prevent form from submitting
    var string = signupForm.cat.value
    var arr = string.split(', '); // split string on comma space
    db.collection('vendors').add({
        name: signupForm.name.value,
        location: signupForm.loc.value,
        category: arr, // signupForm.cat.value,
        logo: "img/ravenCircle.png",
        rating: 0,
        comment: "New Vendor - Waiting for confirm"

      }).then(() => {
        //reset form
        signupForm.reset();
        console.log("success");
      }).catch(err => {
        console.log(err.message);
      });
    });

