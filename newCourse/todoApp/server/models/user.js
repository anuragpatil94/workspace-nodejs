var mongoose = require('mongoose');

var User = mongoose.model('User', {
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    }
});

module.exports = { User };

//EXAMPLE
// var newUser = new User({
//     email: 'a@gmail.com' //not completed
// })

// newUser.save().then((result) => {
//     console.log('User Added: \n', result);

// }, (e) => {
//     console.log(e);

// });