
var input = document.querySelector('input[name=tags]');
var suggestKeywords = ["Education", "Banking","Clothing","Party Rental Supplier","Entertainment","Electronic",
"Sommelier","Stationary Designer","Camera","Florist","Marketing","Communication Consultant"];

// tag inputs
var settings = {
  // enforceWhitelist: true,
  whitelist:suggestKeywords,
  maxTags: 10,
      dropdown: {
        maxItems: 20,           // <- mixumum allowed rendered suggestions
        classname: "tags-look", // <- custom classname for this dropdown, so it could be targeted
        enabled: 0,             // <- show suggestions on focus
        closeOnSelect: false    // <- do not hide the suggestions dropdown once an item has been selected
      }
}


var tagify = new Tagify(input, settings);
// call inputs.value to get tags selected by user



/******LOG OUT ********/
const logoutButton = document.getElementById('logout-button');
logoutButton.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut();
    window.location.href = "index.html";
});

/******ADD VENDOR ********/
const addVendorForm = document.getElementById('add-vendor-form');
const addVendorButton = document.getElementById('add-vendor-button');
const addVendorMsg = document.getElementById('vendor-added');

  // Once all inputs are valid, register user credential to firebase
  addVendorForm.addEventListener('submit', (e)=>{
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        
          // where is the part of checking for logged-in user??
          e.preventDefault(); // prevent form from submitting

          console.log(input.value); // get tags and print them
          
          if (input.value == ''){
            displayToast("Please select at least one keyword.");
            setTimeout(() => {
              closeToast();
            },3000);
          } else {

            // var string = signupForm.cat.value
            // var arr = string.split(', '); // split string on comma space
            var street = addVendorForm.street.value
            var city = addVendorForm.city.value
            var state = addVendorForm.state.value
            var zip = addVendorForm.zip.value
            var loc = street + ', ' + city + ', ' + state + ', ' + zip
            // let arr = Array.from(vendorTags)
            db.collection('newVendor').add({
                name: addVendorForm.name.value,
                // street: signupForm.street.value,
                // category: arr, // signupForm.cat.value,
                // category: arr,
                logo: "img/ravenCircle.png",
                rating: 0,
                comment: "New Vendor - Waiting for confirm",
                location: loc
                // city: signupForm.city.value,
                // country: signupForm.country.value,
                // zip: signupForm.zip.value

              }).then(() => {
                //reset form
                addVendorForm.reset();
                e.preventDefault();

                // display confirm message
                addVendorMsg.style.display = "block";
                addVendorForm.style.display="none";

                window.setTimeout(function(){
                  // Move to html.index after 2 seconds
                  window.location.href = "vendor.html";
                }, 2000);
              }).catch(err => {
                console.log(err.message);
              });
          }
      } else {
              // No user is signed in.
              e.preventDefault();
              window.location.href = "index.html";
      }
    });

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


firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log('logged in');

  } else {
    window.location.href = "index.html";  

  }
  
});