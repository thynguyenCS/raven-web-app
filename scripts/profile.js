/******LOG OUT ********/
const logoutButton = document.getElementById('logout-button');
logoutButton.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut();
    window.location.href = "index2.html";
});

/******VIEW PROFILE ********/
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
    //create another collection to store username with the same user.uid
    db.collection('users').doc(user.uid).get().then(doc => {
        
        // Display some data from the object:
        document.getElementById("userEmail").innerHTML = "Logged in as " + user.email;
        document.getElementById("userName").innerHTML = "User name: " + doc.data().name;

        });
    } else {
    }
});