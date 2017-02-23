var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongodb = require('mongodb');

var ObjectID = mongodb.ObjectID;
var MongoClient = mongodb.MongoClient;
var app = express();

app.use(bodyParser.json());
var localdb = 'mongodb://localhost:27017/testblog';


MongoClient.connect(localdb, function(err, db) {
    if (err) {
        console.log('Error:', err);
        process.exit(1);
    }

    var server = app.listen('3000', function() {
        var port = server.address().port;
        console.log('Express server listening on port', port);
    });

    var newPost = {
        "message": "This is the first blog post, hello blargz!",
        "name": "davi3blue",
        "createdOn": new Date()
    };

    db.collection('posts').insertOne(newPost, function(err, doc) {
        if (err) {
            console.log('Error:', err);
        } else {
            console.log(doc.ops[0]);
        }
    })


});

