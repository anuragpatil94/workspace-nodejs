//const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    //Update
    //filter,update,options,callback(promises)
    //mongodb update operators
    db.collection('Todo').findOneAndUpdate({
        _id: new ObjectID("593c7e543c3441f92fe6a1ec")
    }, {
            $set: {
                completed: true
            }
        }, {
            returnOriginal: false //will return the updated document
        }).then((result) => {
            console.log(result);

        })
    //db.close(); 
});