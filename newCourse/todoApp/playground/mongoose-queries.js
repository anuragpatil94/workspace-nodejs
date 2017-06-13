const { ObjectID } = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');

var id = '593d7d24f8c29a51dc91e71c';

if (!ObjectID.isValid(id)) {
    console.log('ID not Valid');
}
// Todo.find({
//     _id: id
// }).then((todo) => {
//     console.log('Todo find: ', todo);
// });

// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('Todo findOne: ', todo);
// });

Todo.findById(id).then((todo) => {
    if (!todo) {
        return console.log('ID not Found');

    }
    console.log('Todo by id: ', todo);

}).catch((e) => {
    console.log('catch error');

})
