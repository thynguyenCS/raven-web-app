/******LOG OUT ********/
const logoutButton = document.getElementById('logout-button');
logoutButton.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut();
    window.location.href = "index.html";
});

/******ADD VENDOR ********/
const signupForm = document.getElementById('add-vendor-form');
const signupButton = document.getElementById('add-vendor-button');

  // Once all inputs are valid, register user credential to firebase
  signupForm.addEventListener('submit', (e)=>{
    e.preventDefault(); // prevent form from submitting
    if (vendorTags.size == 0){
      displayToast("Please select at least one category.");
      setTimeout(() => {
        closeToast();
      },3000);
    } else {

    // var string = signupForm.cat.value
    // var arr = string.split(', '); // split string on comma space
    var street = signupForm.street.value
    var city = signupForm.city.value
    var state = signupForm.state.value
    var zip = signupForm.zip.value
    var loc = street + ', ' + city + ', ' + state + ', ' + zip
    db.collection('newVendor').add({
        name: signupForm.name.value,
        // street: signupForm.street.value,
        // category: arr, // signupForm.cat.value,
        category: ["Unknown"],
        logo: "img/ravenCircle.png",
        rating: 0,
        comment: "New Vendor - Waiting for confirm",
        location: loc
        // city: signupForm.city.value,
        // country: signupForm.country.value,
        // zip: signupForm.zip.value

      }).then(() => {
        //reset form
        signupForm.reset();
        // console.log("success");
        e.preventDefault();
        // window.location.href = "vendor3.html";
        // display confirm message
        success("Vendor added successfully!");
        window.setTimeout(function(){
          // Move to html.index after 2 seconds
          window.location.href = "vendor3.html";
        }, 2000);
      }).catch(err => {
        console.log(err.message);
      });
    }
    });

    function success(msg){
      Swal.fire({
          icon:'success',
          title:'<p style="color:white">' + msg + '</p>',
          width: 420,
          showConfirmButton: false,
          background:'#755ee8'
        })
  
  }
/******VIEW PROFILE ********/
const profileButton = document.getElementById('profile');
profileButton.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = "profile.html";
});


window.onload = function () {
  initTagList();
}