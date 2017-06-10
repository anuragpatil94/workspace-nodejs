//super test for express
const express = require('express');

var app = express();

app.get('/', (req, res) => {
    res.status(404).send({
        error: 'Page Not Found!',
        name: 'Todo App v1.0'
    });
    //status(404) will show 404 error if something went wrong
});

app.get('/users', (req, res) => {
    res.send([{
        name: 'Anurag Patil',
        age: 22
    }, {
        name: 'Aditya G',
        age: 22
    }, {
        name: 'Jack Sparrow',
        age: 1000
    }])
});

app.listen(3000);

module.exports.app = app;