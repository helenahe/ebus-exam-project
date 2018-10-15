// get input from login for and set as variables
    var inputEmail = document.getElementById('emailaddress');
    var inputPassword = document.getElementById('password')

// create User class
    class User{

        constructor(firstname, lastname, emailaddress, password) {
            this.firstname = firstname;
            this.lastname = lastname;
            this.emailaddress = emailaddress;
            this.password = password; // hash password...what???
            } // close constructor
        } //close User class

// hard code some users (replace later with JSON file)
    // 1. creating empty user array
    var users = [];
    // 2. filling user array
    users.push(new User("Anna", "Smith", "anna@gmail.com", "1"));
    users.push(new User("Ben", "Williams", "ben@gmail.com", "2"));

    console.log(users); // check users

// setting allowed login attempts to block user after 3 unsuccessful tries
    var attempts = 3; 

// connect variable to resultLogin to display login output in html
    var resultSpan = document.getElementById('loginResult');

// binding submit button to variable
    var submit = document.getElementById('submit');

// start login function by clicking submit
    submit.onclick = function login() {

//telling user to enter credentials, in case they submit empty fields
    if(inputEmail.value.length == 0 || inputPassword.value.length == 0){
        resultSpan.innerText = "You need to enter your email address and password in order to log in";
        return false;
    } 

// Loop through users and return true if matching
    for(var i = 0; i < users.length; i++) {

// Bind user to a variable  
    var user = users[i]; 

    console.log(i) // checking if loop works

//  Successful login in input matches user credentials
   if (inputEmail.value == user.emailaddress && inputPassword.value == user.password) {
            resultSpan.innerText = "Congrats! You actually remembered your password correctly";
            return true;
        }
    }

// block user if too many failed login attempts.
            if (attempts == 0){
                resultSpan.innerText = "You've entered the wrong credentials 3 times. For security purposes, we've blocked you from our system";
                inputEmail.disabled = true;
                inputPassword.disabled = true; 
                submit.disabled = true;
                return false;
                
             } else {
                attempts--; //subtract one from allowed attempts 
                resultSpan.innerText = "Nice try! Go again. You have " + attempts + " more attempts to get it right.";
                console.log(attempts); // check if counter works
                return false;
                }

                

          

}; // close function



// To do:
// - store password as hashpassword
// - redirect user to site, when logged in? 
// - display sign out button, disable login once logged in
// - what is last Access all about?
//      - enable login again after periode of time, after being blocked for too many failed attempts??