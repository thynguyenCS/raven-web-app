function isNameValid(name){
    var nameField = document.getElementById(name);
    var nameValue= nameField.value.trim();
    // toggleOffToast('error');
    if (nameValue==""){
        toast('error',"Please enter your full name.");
        return false;
        // nameField.setCustomValidity("Please enter your full name.");
    }
    // nameField.setCustomValidity("");
    return true;
    
}
function isEmailValid(email){
    var emailField = document.getElementById(email);
    var emailValue = emailField.value.trim();
    // toggleOffToast('error');
    if (emailValue ==""){
        toast('error',"Please enter an email address.");
        return false;
    }
    var re = new RegExp("[^@\s]+@raven.com");
    if (re.test(emailValue)){
        return true;
    }
    toast('error',"Email address must match the requested format: a@raven.com.");
    return false;
}
function isPasswordValid(password){
    var passwordField = document.getElementById(password);
    var passwordValue = passwordField.value;
    // toggleOffToast('error');
    if (passwordValue ==""){
        toast('error',"Please enter a password.");
        return false;
    }
    var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,15}$/;
    if (re.test(passwordValue)){
        return true;
    }
    toast('error',"Your password must be between 8 to 15 characters and contains at least one numeric digit, one uppercase, one lowercase letter and one symbol.");
    return false;
}
function isLoginPasswordValid(password){
    var passwordField = document.getElementById(password);
    var passwordValue = passwordField.value;
    // toggleOffToast('error');
    if (passwordValue ==""){
        toast('error',"Please enter a password.");
        return false;
    }
    // toggleOffToast('error');
    return true;
}
