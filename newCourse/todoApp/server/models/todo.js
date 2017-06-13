var mongoose = require('mongoose');

var Todo = mongoose.model('Todo', {
    text: {
        type: String,
        //Validators
        required: true,  //isRequired
        minlength: 1,    //minimum length of text field should be 1
        trim: true        //removes white spaces from left and right of string
    },
    completed: {
        type: Boolean,
        default: false

    },
    completedAt: {
        type: Number,
        default: null
    }
});

module.exports = { Todo };

//EXAMPLE
// var newTodo = new Todo({
//     text: 'Cook Dinner'
// });
// newTodo.save().then((doc) => {
//     console.log('Saved Todo: ', doc);
// }, (err) => {
//     console.log(err);
// });

// var newTodo2 = new Todo({
//     text: '  Edit this Video Again ',
//     completed: true,
//     completedAt: 123
// });
// newTodo2.save().then((doc) => {
//     console.log('Saved Todo: ', doc);
// }, (err) => {
//     console.log(err);
// });