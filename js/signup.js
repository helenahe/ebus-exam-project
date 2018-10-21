// bind variable to span text
var resultSpan = document.getElementById('signupResult');

// binding submit button to variable
var submit = document.getElementById('submit');

// executes signup function when enter is pressed   (source: https://stackoverflow.com/questions/16011312/execute-function-on-enter-key) 
submit.addEventListener("keydown", function (e) {
    if (e.keyCode === 13) { // key === 13 stands for enter/return key
        signup(e);
    }
})

// bind input to variables
var inputFirstname = document.getElementById('firstname');
var inputLastname = document.getElementById('lastname');
var inputEmail = document.getElementById('emailaddress');
var inputPassword = document.getElementById('password');
var inputRepeatPassword = document.getElementById('repeatpassword');

// creating empty user array
var users = [];

// execute function, by clicking submit button
submit.onclick = function signup(e) {
    e.preventDefault(); //to tell the browser not to refresh

    // make sure that user fills out all fields  
    if (inputFirstname.value.length === 0 || inputLastname.value.length === 0 || inputEmail.value.length === 0 || inputPassword.value.length === 0 || inputRepeatPassword.value.length === 0) {
        resultSpan.innerText = "You need to fill out all fields in order to sign up";
        return false;
    }
    // check if password and confirm password match  
    if (inputPassword.value !== inputRepeatPassword.value) {
        resultSpan.innerText = "Passwords don't match.";
        return false;
    }
    // store sign up input in new user
    users.push(new User(
        inputFirstname.value, 
        inputLastname.value, 
        inputEmail.value, 
        inputPassword.value, 
        inputRepeatPassword.value
    ));
    console.log(users);
}

 // TODO store sign up input in new user (done)
 // TODO check against user database, if this email address is already signed up. 
 // TODO check password strength 
 // TODO validate email address (making sure that user puts in a real email address, and not just some text)
 // display successful sign up message and redirect to login, once signed up