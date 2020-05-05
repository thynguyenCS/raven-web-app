/******LOG OUT ********/
const logoutButton = document.getElementById('logout-button');
logoutButton.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut();
    window.location.href = "main.html";
});

/******VIEW PROFILE ********/
// Tuong: Does this function work????
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
    //create another collection to store username with the same user.uid
    db.collection('users').doc(user.uid).get().then(doc => {
        
        // Display some data from the object:
        document.getElementById("userEmail").innerHTML = "Logged in as " + user.email;
        document.getElementById("userName").innerHTML = "User name: " + doc.data().displayName;
        localStorage.setItem("userName", displayName);

        });
    } else {
        window.location.href = "index.html";
        // Display some data from the object:
        // document.getElementById("userEmail").innerHTML = "Please login to view profile";
        // document.getElementById('display-all').style.display="none";
        // document.getElementById('user-not-logged-in').style.display = "block";
        console.log('not logged in');

    }
});