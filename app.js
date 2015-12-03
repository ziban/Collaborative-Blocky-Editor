/**
*@Author Collins Sirmah and Justin Lee 
*/
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Logger outputs to a file instead of the console. 
app.use(logger('common', {
    stream: fs.createWriteStream('./access.log', {flags: 'a'})
}));

//Use debugging
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Implementation for the main page
app.get('/', function(req, res) {
  res.render('index')
})

//Implementation for different rooms
app.get('/(:id)', function(req, res) {
  res.render('index')
})

//Add sharejs 
var sharejs = require('share');
require('redis');

//Options for the sharejs server. Added the redis database for persistence 
var options = {
  db: {type: 'redis'},
};

//Attach sharejs and express server
sharejs.server.attach(app, options);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
