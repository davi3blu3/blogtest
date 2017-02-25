var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongodb = require('mongodb');
var ObjectID = mongodb.ObjectID;
var MongoClient = mongodb.MongoClient;
var localdb = 'mongodb://localhost:27017/testblog';

// setup server
var app = express();
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

// connect to database
MongoClient.connect(localdb, function(err, db) {
    if (err) {
        console.log('Mongo Connect error:', err);
        process.exit(1);
    }

    // start server
    var server = app.listen('3000', function() {
        var port = server.address().port;
        console.log('Express server listening on port', port);
    });

    // generic error handler
    function errorHandler(err) {
        console.log('ERROR:', err);
        res.status(500).send(err);        
    }

    // GET REQUEST: Retreive all posts
    app.get('/posts', function(req, res) {
        db.collection('posts').find({}).toArray(function(err, docs) {
            if (err) errorHandler(err);
            else {
                console.log('GET request received!');
                res.status(200).json(docs);
            }
        });
    });

    // POST REQUEST: Save a new post
    app.post('/posts', function(req, res) {
        
        var newPost = {
            "message": req.body.message,
            "name": req.body.name,
            "createdOn": new Date()
        };

        db.collection('posts').insertOne(newPost, function(err, doc) {
            if (err) errorHandler(err);
            else {
                console.log('POST request received!');
                console.log(doc.ops[0]);
                res.status(200).send(doc.ops[0]);
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
                 console.log('PUT request received!');
                 res.status(204).send();
             }
         })
     })

    // DELETE REQUEST: Delete existing post
     app.delete("/posts/:id", function(req, res) {
        db.collection('posts').deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
            if (err) errorHandler(err);
            else {
                console.log('DELETE request received!');
                res.status(204).send()
            }
        })
    });
});