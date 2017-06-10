//spies- let you swap out real function for a testing utitlity
var db = require('./db.js');

module.exports.handleSignup = (email, password) => {
    //check if the email exists
    //save user to database
    db.saveUser({ email, password });

    //send welcome email

}