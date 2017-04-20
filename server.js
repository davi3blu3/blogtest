// bring in dependencies
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');
var routes = require('./api/routes');

// database specific dependencies, methods, and path
var mongodb = require('mongodb');
var ObjectID = mongodb.ObjectID;
var mongoose = require('mongoose');

// connect to database
var db = require('./api/data/dbconnection.js');

// setup middleware
app.set('port', 3000);
app.use(function(req, res, next) {
    console.log(req.method, req.url);
    next();
});
app.use(express.static(path.join(__dirname + '/public')));
app.use('/', routes);
app.use(bodyParser.json());

// start server
var server = app.listen('3000', function() {
    var port = server.address().port;
    console.log('Express server listening on port', port);
});


    /*
    *   API ROUTES : USERS
    */

var User = mongoose.model('User');

// POST REQUEST: Register new user
app.post('/newuser', function(req, res) {
    console.log('post request received');
    var username = req.body.username;
    var password = req.body.password;

    User.create({
        "username": username,
        "password": bcrypt.hash(password, bcrypt.genSaltSync(10))
    }, function(err, newUser){
        if (err) {
            console.log(err);
            res.status(400).json(err);
        } else {
            console.log(newUser);

            // // add new user to db
            // db.collection('users').insertOne(newUser, function(err, user) {
            //     if (err) errorHandler(err);
            //     else {
            //         res.status(200).json(user);
            //     }
            // })

            res.status(200).json(newUser);
        }
    });
})

// POST REQUEST: Login returning user
app.post('/loginuser', function(req, res) {
    console.log('post request received');

    var User = {
        "username": req.body.username,
        "password": req.body.password,
    };

    console.log(User);

    // db.collection('users').insertOne(newUser, function(err, user) {
    //     if (err) errorHandler(err);
    //     else {
    //         res.status(200).json(user);
    //     }
    // })
})    


