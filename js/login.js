// get input from login for and set as variables
var inputEmail = document.getElementById('emailaddress');
var inputPassword = document.getElementById('password');

// create users variable and get users from local storage - if there are no users, create an empty array, otherwise parse users
var users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];

            // 2. hard code some example users
                users.push(new User("Anna", "Smith", "anna@gmail.com", "1"));
                users.push(new User("Ben", "Williams", "ben@gmail.com", "2"));

                console.log(users); // check users

// setting allowed login attempts to block user after 3 unsuccessful tries
var attempts = 3;

// connect variable to resultLogin to display login output in html
var resultSpan = document.getElementById('loginResult');

// binding submit button to variable
var submit = document.getElementById('submit');

// creating variable that stores whether the user is logged in or not. Starts as false, changes to true on successful log in 
var isLoggedIn = false;
console.log(isLoggedIn);

    // stringify isLoggedIn and put into localStorage
    var isLoggedInStringified = JSON.stringify(isLoggedIn);
    localStorage.setItem('isLoggedIn', isLoggedInStringified);

//making sure the logout button is hidden, when user isn't logged in (changed to visible when login successful)
var logoutButton = document.getElementById('logoutButton');
logoutButton.style.visibility = 'hidden';

// executes login function when enter is pressed   (source: https://stackoverflow.com/questions/16011312/execute-function-on-enter-key) 
submit.addEventListener("keydown", function (enter) {
    if (enter.keyCode === 13) { // key === 13 stands for enter/return key
        login(enter);
    }
})
// start login function by clicking submit
submit.onclick = function login() {

    //telling user to enter credentials, in case they submit empty fields
    if (inputEmail.value.length == 0 || inputPassword.value.length == 0) {
        resultSpan.innerText = "You need to enter your email address and password in order to log in";
        return false;
    }

    // Loop through users and return true if matching
    for (var i = 0; i < users.length; i++) {

        // Bind user to a variable  
        var user = users[i];

        console.log(i) // checking if loop works

        //  Successful login if input matches user credentials
        if (inputEmail.value == user.emailaddress && inputPassword.value == user.password) {
            resultSpan.innerText = "Congrats " + user.firstname + " " + user.lastname + ", you actually remembered your password correctly";
            isLoggedIn = true;
            localStorage.setItem('isLoggedIn', isLoggedIn); // update local storage
            logoutButton.style.visibility = 'visible'; // show logout button
            console.log(isLoggedIn); // check if loginStatus changed upon successful login

            return false;

        }
    }
   
    // block user if too many failed login attempts.
    if (attempts == 0) {
        resultSpan.innerText = "You've entered the wrong credentials 3 times. For security purposes, we've blocked you from our system";
        inputEmail.disabled = true;
        inputPassword.disabled = true;
        submit.disabled = true;
        return false;

    } else {
        attempts--; //subtract one from allowed attempts 
        resultSpan.innerText = "Nice try! Go again. After this, you have " + attempts + " more attempts to get it right.";
        console.log(attempts); // check if counter works
        console.log(isLoggedIn); // check if loginStatus still false
        return false;
    }

}; // close function

//logout button: changes state of isLoggedIn to false again; logout button disappears again after log out
logoutButton.onclick = function LogOut(){
    if (isLoggedIn === true){
    isLoggedIn = false;
    localStorage.setItem('isLoggedIn', isLoggedIn); // update local storage
    logoutButton.style.visibility = 'hidden';
    console.log(isLoggedIn);
    }
}
// To do:
// - store password as hashpassword
// - what is last Access all about?
//      - enable login again after periode of time, after being blocked for too many failed attempts??