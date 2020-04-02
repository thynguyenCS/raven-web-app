// This function validates login/signup inputs
function validate(email,password){
    var signupEmail = document.getElementById(email);
    var signupPassword = document.getElementById(password);
    var isEmailValid = false;
    var isPasswordValid = false;
    // check if the email value is:
    // 1. empty
    // 2. doesn't match the regex
    var emailValue = signupEmail.value.trim();
    if (emailValue ==""){
        signupEmail.setCustomValidity("Please enter an email address.");

    }else{
        var re = new RegExp("[^@\s]+@[^@\s]+\.[^@\s]+");
        if (!re.test(emailValue)){
            signupEmail.setCustomValidity("Please match the requested format: a@b.c");
         
        }
        else{
            signupEmail.setCustomValidity("");
            isEmailValid = true;
        }
    }
    // check if the password value is:
    // 1. empty
    // 2. doesn't match the regex
    var passwordValue = signupPassword.value;
    if (passwordValue ==""){
        signupPassword.setCustomValidity("Please enter a password.");
    }else{
        var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,15}$/;
        if (!re.test(passwordValue)){
            signupPassword
            .setCustomValidity("Your password must be between 8 to 15 characters and contains at least one numeric digit, one uppercase and one lowercase letter.");
        }
        else{
            signupPassword.setCustomValidity("");
            isPasswordValid = "true";
        }
    }
    return (isEmailValid && isPasswordValid);
}
