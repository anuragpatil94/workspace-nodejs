//const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    //FETCH
    // db.collection('Todo').find().toArray().then((doc) => {
    //     console.log('Todo');
    //     console.log(JSON.stringify(doc, undefined, 2));
    // }, (err) => {
    //     console.log('Unable to fetch data: ', err);
    // });

    // db.collection('Todo').find({ completed: false }).toArray().then((doc) => {
    //     console.log('Todo');
    //     console.log(JSON.stringify(doc, undefined, 2));
    // }, (err) => {
    //     console.log('Unable to fetch data: ', err);
    // });

    // db.collection('Todo').find({
    //     _id: new ObjectID('593c2ebb3afb22345cd1ac6f')
    // }).toArray().then((doc) => {
    //     console.log('Todo');
    //     console.log(JSON.stringify(doc, undefined, 2));
    // }, (err) => {
    //     console.log('Unable to fetch data: ', err);
    // });

    //COUNT - go to api docs 'cursor' to find more such method like count and toArray
    db.collection('Todo').find().count().then((count) => {
        console.log(`Todo count: ${count}`);
    }, (err) => {
        console.log('Unable to fetch data: ', err);
    });
    //db.close();
});