var express = require('express');
var router = express.Router();

/* GET users listing. */

// The url would be: localhost:3000/users/
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// The url would be: localhost:3000/users/detail
router.get('/detail', function(req, res, next) {
    res.send('User Details');
});

module.exports = router;
