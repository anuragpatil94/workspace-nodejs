const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
//check package.json for test script changes made to support test database, heroku database and local database
mongoose.connect(process.env.MONGODB_URI);
//if heroku ask for bill payment for mlabs addon.. go to mlab.com, create db, click on db, create user,then 
//use command heroku config:set MONGODB_URI="<similar following string>"
//mongoose.connect('mongodb://asd:asdasd@ds121622.mlab.com:21622/todoapp');

module.exports = {
    mongoose
}