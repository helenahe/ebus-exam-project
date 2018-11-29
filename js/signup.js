// bind variable to span text
var resultSpan = document.getElementById('signupResult');

// bind input to variables
var inputFirstname = document.getElementById('firstname');
var inputLastname = document.getElementById('lastname');
var inputEmail = document.getElementById('emailaddress');
var inputPassword = document.getElementById('password');
var inputRepeatPassword = document.getElementById('repeatpassword');
var inputSubmit = document.getElementById('submit');

// check if there are some users in localStorage if not create an empty array, otherwise parse users
var users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];

// executes signup function when enter is pressed   (source: https://stackoverflow.com/questions/16011312/execute-function-on-enter-key) 
submit.addEventListener("keydown", function (e) {
    if (e.keyCode === 13) { // key === 13 stands for enter/return key
        signup(e);
    }
})

// execute function, by clicking submit button
submit.onclick = function signup(e) {
    e.preventDefault(); //to tell the browser not to refresh

    // make sure that user fills out all fields  
    if (inputFirstname.value.length === 0 || inputLastname.value.length === 0 || inputEmail.value.length === 0 || inputPassword.value.length === 0 || inputRepeatPassword.value.length === 0) {
        resultSpan.innerText = 'You need to fill out all fields in order to sign up';
        return false;
    }
    // check if password and confirm password match  
    if (inputPassword.value !== inputRepeatPassword.value) {
        resultSpan.innerText = 'Passwords don\'t match.';
        return false;
    }

    // check if the email address is already stored in local storage
    for (i = 0; i < users.length; i++) {
        if (users[i].emailaddress === inputEmail.value) {
            resultSpan.innerText = 'This email address is already in use';
            return false;
        } 
    } //close function

    // store sign up input in new user
    var newUser = new User(
        inputFirstname.value,
        inputLastname.value,
        inputEmail.value,
        // The MD5 is a hashing algorithm method (source: https://stackoverflow.com/questions/14733374/how-to-generate-md5-file-hash-on-javascript/33486055#33486055)
        MD5(inputPassword.value),
        Date()
    );

    // push user into users array
    users.push(newUser);

    // stringify users and put into localStorage
    var usersStringified = JSON.stringify(users);
    localStorage.setItem('users', usersStringified);

    resultSpan.innerHTML = "Sign up successful <a href = login.html> click here to log in </a>";

    document.getElementById("signup_form").reset();
    // debugger;
}