//const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb'); //same as above, directly set MongoClient property to a variable

//This pulls out the timestamp object created by mongodb while saving it as _id
var obj = new ObjectID();
console.log(obj);


//object destructuring- helps pulling out properties and then assigned to a variable
// var user ={name:'anurag',age:22};
// var {name}=user;

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    //INSERT EXAMPLES
    // db.collection('Todo').insertOne({
    //     text: 'Something to do',
    //     completed: false
    // }, (err, result) => {
    //     if (err) {
    //         return console.log('Unable to insert todo: ', err);
    //     }

    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });

    // db.collection('Users').insertOne({
    //     name: 'Anurag Patil',
    //     age: 22,
    //     location: 'New Jersey'
    // }, (err, result) => {
    //     if (err) {
    //         return console.log('Unable to insert user: ', err);
    //     }

    //     console.log(JSON.stringify(result.ops, undefined, 2));
    //     console.log(result.ops[0]._id.getTimestamp());

    // });


    //FETCH
    db.collection('Users').find().toArray().then((doc) => {
        console.log('Users');
        console.log(JSON.stringify(doc, undefined, 2));


    }, (err) => {
        console.log('Unable to fetch data: ', err);

    });

    //db.close();
});