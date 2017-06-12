var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
//var logger = require('morgan');
//var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
 
var index = require('./server/routes/api');
var users = require('./server/modals/users');
//var dashboard = require('./server/modals/dashboard');
 
var app = express();
 
// view engine setup
app.set('views', path.join(__dirname, 'dist'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'dist')));
 
app.use('/', users);
//app.use('/dashboard', dashboard);

//app.use('/api/v1/', msv4);
app.get('/*', function (req, res){
    res.render('index.html');
});
 
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

var server = app.listen(3000, function() {
    var host = 'localhost';
    var port = server.address().port;
    console.log('App listening at http://%s:%s', host, port);
});
 
module.exports = app;