var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express',condition:true });
    //res.render('index', { title: 'Express',condition:false });
});


/**
if user.js is removed from routes then here since index is the index file the usr would change in the get method
 The url would be: localhost:3000/users/
router.get('/users', function(req, res, next) {
    res.send('respond with a resource');
});

// The url would be: localhost:3000/users/detail
router.get('/users/detail', function(req, res, next) {
    res.send('User Details');
});
*/


module.exports = router;
