function login(){

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

// hard code some users
// 1. creating empty user array
    var users = [];
//2. filling user array
    users.push(new User("Anna", "Smith", "anna@gmail.com", "1"));
    users.push(new User("Ben", "Williams", "ben@gmail.com", "2"));

   console.log(users);

// Loop through users and return true if matching
for(var i = 0; i < users.length; i++) {
// Bind user to a variable  
 var user = users[i]; 

 console.log(i) // checking if loop works
  
   if (inputEmail.value == user.emailaddress && inputPassword.value == user.password) {
            window.alert("Congrats! You actually remembered your password correctly");
            return true;
        } 
    }

// How to integrate else? if I put it after if, the loop stops.
//else{
// window.alert("Nice try! Go again.");
//         return false;
//    }

//telling user to enter credentials, in case they submit empty fields
    if(inputEmail.value.length == 0 || inputPassword.value.length == 0){
        window.alert("You need to enter your and password in order to log in");
        return false;
}           

}; // close function



// To do:
// - else, if email or pw is wrong.
// - store password as hashpassword
// - redirect user to site, when logged in? 
// - what is last Access all about?
// - counter for login attemps & block user after 3 tries-->