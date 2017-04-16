// bring in dependencies
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');

// database specific dependencies, methods, and path
var mongodb = require('mongodb');
var ObjectID = mongodb.ObjectID;
var localdb = 'mongodb://localhost:27017/testblog';
var mongoose = require('mongoose');

// setup middleware
app.use(function(req, res, next) {
    console.log(req.method, req.url);
    next();
});
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

// connect to database
mongodb.MongoClient.connect(localdb, function(err, db) {
    // handle db connect error
    if (err) {
        console.log('Mongo Connect error:', err);
        process.exit(1);
    }

    // start server
    var server = app.listen('3000', function() {
        var port = server.address().port;
        console.log('Express server listening on port', port);
    });

    // generic error handler - http requests
    function errorHandler(err) {
        console.log('ERROR:', err);
        res.status(500).send(err);        
    }

    /*
     *   API ROUTES : POSTS
     */

    // GET REQUEST: Retreive all posts
    app.get('/posts', function(req, res) {
        db.collection('posts').find({}).sort({ createdOn: -1 }).toArray(function(err, docs) { // sort by time within query?
            if (err) errorHandler(err);
            else {                
                res.status(200).json(docs);
            }
        });
    });

    // POST REQUEST: Save a new post
    app.post('/posts', function(req, res) {

        console.log(req.body);
        
        var newPost = {
            "message": req.body.message,
            "name": req.body.name,
            "createdOn": new Date()
        };

        db.collection('posts').insertOne(newPost, function(err, doc) {
            if (err) errorHandler(err);
            else {
                res.status(200).send();
            }
        })
    })

    // PUT REQUEST: Update existing post
    app.put('/posts/:id', function(req, res) {

        var updateDoc = req.body;
        delete updateDoc._id;
        updateDoc.updatedOn = new Date();


         db.collection('posts').updateOne({_id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
             if (err) errorHandler(err);
             else {
                 res.status(204).send();
             }
         })
     })

    // DELETE REQUEST: Delete existing post
     app.delete("/posts/:id", function(req, res) {
        db.collection('posts').deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
            if (err) errorHandler(err);
            else {
                res.status(204).send()
            }
        })
    });

    /*
     *   API ROUTES : USERS
     */
    
    require('./app/models/user.model');
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
});

