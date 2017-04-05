var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hbs = require('express-handlebars');
var expressValidator=require('express-validator');
var expressSession=require('express-session');


var index = require('./routes/index');


var app = express();

// view engine setup
app.engine('handlebars',hbs({extName:'handlebars', defaultLayout:'layout', layoutDir:__dirname+'/views/layouts/'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//why here??
//after body parser because validator needs access to the parsed values
app.use(expressValidator());

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// secret-   saveUnintialized- if true then it is stored to session storage even if it is uninitialized
//resave- if true then save session after each request even if it is initialized or wasn't modified.
// setting it false will save the session only if we save something
app.use(expressSession({secret:'max', saveUninitialized:false,resave:false}));
app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
