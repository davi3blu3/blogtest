var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongodb = require('mongodb');

var ObjectID = mongodb.ObjectID;
var MongoClient = mongodb.MongoClient;

var app = express();
app.use(express.static(__dirname + '/public'));
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

    // var newPost = {
    //     "message": "This is the next blog post, we did it!",
    //     "name": "zombieLeia",
    //     "createdOn": new Date()
    // };

    // db.collection('posts').insertOne(newPost, function(err, doc) {
    //     if (err) {
    //         console.log('Error:', err);
    //     } else {
    //         console.log(doc.ops[0]);
    //     }
    // })


});

