var express = require('express');
// var path = require('path');
var bodyParser = require('body-parser');
var mongodb = require('mongodb');
var ObjectID = mongodb.ObjectID;

var ObjectID = mongodb.ObjectID;
var MongoClient = mongodb.MongoClient;

var app = express();
// app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
var localdb = 'mongodb://localhost:27017/testblog';


MongoClient.connect(localdb, function(err, db) {
    if (err) {
        console.log('Mongo Connect error:', err);
        process.exit(1);
    }

    var server = app.listen('3000', function() {
        var port = server.address().port;
        console.log('Express server listening on port', port);
    });

    /*
     *  GET REQUEST: Retreive all posts
     */

    app.get('/posts', function(req, res) {
        db.collection('posts').find({}).toArray(function(err, docs) {
            if (err) {
                console.log('GET error:', err);
                res.status(500).send(err);
            } else {
                console.log('GET request received!');
                res.status(200).json(docs);
            }
        });
    });

    /*
     *  POST REQUEST: Save a new post
     */

    app.post('/posts', function(req, res) {
        console.log('POST request received!');
        var newPost = {
            "message": req.body.message,
            "name": req.body.name,
            "createdOn": new Date()
        };

        db.collection('posts').insertOne(newPost, function(err, doc) {
            if (err) {
                console.log('Error:', err);
            } else {
                console.log(doc.ops[0]);
                res.status(200).send(doc.ops[0]);
            }
        })
    })

    /*
     *  PUT REQUEST: Update existing post
     */

    app.put('/posts/:id', function(req, res) {

        var updateDoc = req.body;
        // delete updateDoc._id;

         db.collection('posts').updateOne({_id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
             if (err) {
                 console.log('Error:', err);
             } else {
                 res.status(204).send(doc.ops[0]);
             }
         })
     })


});

