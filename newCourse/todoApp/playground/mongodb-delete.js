//const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    //Delete
    //DeleteMany
    // db.collection('Todo').deleteMany({ text: 'Exercise' }).then((result) => {
    //     console.log(result);
    // }, (err) => {
    //     console.log(err);
    // });

    //DeleteOne
    // db.collection('Todo')
    //     .deleteOne({ text: 'Exercise' })
    //     .then((result) => {
    //         console.log(result);
    //     }, (err) => {
    //         console.log(err);
    //     })

    //findOneAndDelete
    // db.collection('Todo').findOneAndDelete({ completed: false }).then((result) => {
    //     console.log(result);
    // }, (err) => {
    //     console.log(err);
    // });
    // db.collection('Todo').findOneAndDelete({ _id: new ObjectID('593c7e503c3441f92fe6a1ea') }).then((result) => {
    //     console.log(result);
    // }, (err) => {
    //     console.log(err);
    // });
    //db.close(); 
});