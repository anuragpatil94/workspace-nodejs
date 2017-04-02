var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express',condition:true, anyArray:["A","B","C"]});
});
router.get('/test/:id',function (req,res,next) {
    res.render('test',{output:req.params.id});
});

router.post('/test/submit',function (req,res,next) {
  //getting ID from post request as a get parameter for the next route
  // req.body.id  body since we have a form in body from where we are submitting id (from input name flied) check index.handlebars

    //getting ID from post
    var id=req.body.id;

  //as a get parameter
  res.redirect('/test/'+id);
});

module.exports = router;
