
/******LOG OUT ********/
const logoutButton = document.getElementById('logout-button');
logoutButton.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut();
    window.location.href = "main.html";
});

// const main_searchButton = document.getElementById('main-search-button');
const main_inputName = document.getElementById("main-search-vendor");
const main_inputLoc = document.getElementById("main-search-loc");
const main_search_button = document.getElementById('main-search-button');

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        document.getElementById("header-login").style.display="none";
        document.getElementById("header-signup").style.display="none";
        document.getElementById("dropdown").style.display = "block";
        console.log('logged in');

    } else {
        document.getElementById("header-login").style.display= "block";
        document.getElementById("header-signup").style.display = "block";
        document.getElementById("dropdown").style.display = "none";
        // toggle user elements
        // loginButton.style.display = 'block';
        // signupButton.style.display = 'block';
        // document.getElementById('login-button').style.display = "block";
        // document.getElementById('signup-button').style.display = "block";
        // document.getElementById('user-logged-in').style.display = "block";

        console.log('not logged in');

    }
    
});
main_search_button.addEventListener('click', (e) => {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            e.preventDefault();

            window.location.href ="vendor.html";

        }else {
            window.location.href ="index.html";
        }
    })
})

