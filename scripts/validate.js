function isNameValid(name){
    var nameField = document.getElementById(name);
    var nameValue= nameField.value.trim();
    if (nameValue==""){
        nameField.setCustomValidity("Please enter your full name.");
    }else {
        nameField.setCustomValidity("");
        return true;
    }
    return false;
}
function isEmailValid(email){
    var emailField = document.getElementById(email);
    var emailValue = emailField.value.trim();
    if (emailValue ==""){
        emailField.setCustomValidity("Please enter an email address.");
    }else{
        var re = new RegExp("[^@\s]+@raven.com");
        if (!re.test(emailValue)){
            emailField.setCustomValidity("Please match the requested format: a@raven.com");
        }
        else{
            emailField.setCustomValidity("");
            return true;
        }
    }
    return false;
}
function isPasswordValid(password){
    var passwordField = document.getElementById(password);
    var passwordValue = passwordField.value;
    if (passwordValue ==""){
        passwordField.setCustomValidity("Please enter a password.");
    }else{
        var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,15}$/;
        if (!re.test(passwordValue)){
            passwordField
            .setCustomValidity("Your password must be between 8 to 15 characters and contains at least one numeric digit, one uppercase, one lowercase letter and one symbol.");
        }
        else{
            passwordField.setCustomValidity("");
            return true;
        }
    }
    return false;

}
function isLoginPasswordValid(password){
    var passwordField = document.getElementById(password);
    var passwordValue = passwordField.value;
    if (passwordValue ==""){
        passwordField.setCustomValidity("Please enter a password.");
    }else{
        passwordField.setCustomValidity("");
        return true;
        // var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,15}$/;
        // if (!re.test(passwordValue)){
        //     passwordField
        //     .setCustomValidity("Your password must be between 8 to 15 characters and contains at least one numeric digit, one uppercase, one lowercase letter and one symbol.");
        // }
        // else{
        //     passwordField.setCustomValidity("");
        //     return true;
        // }
    }
    return false;
}
isEmailValid('login-email');
isLoginPasswordValid('login-password');