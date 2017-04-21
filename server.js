// npm dependencies
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

// local dependencies
var db = require('./api/data/dbconnection.js');
var routes = require('./api/routes');

// configure express middleware
app.set('port', 3000);
app.use(function(req, res, next) {
    console.log(req.method, req.url);
    next();
});
app.use(express.static(path.join(__dirname + '/public')));
app.use(bodyParser.json());
app.use('/sitv', routes);


// start server
var server = app.listen('3000', function() {
    var port = server.address().port;
    console.log('Express server listening on port', port);
});
