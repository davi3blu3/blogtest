var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongodb = require('mongodb');

var ObjectID = mongodb.ObjectID;
var MongoClient = mongodb.MongoClient;
var app = express();

app.use(bodyParser.json());
var localdb = 'mongodb://localhost:27017';
var db;

MongoClient.connect(localdb, function(err, database) {
    if (err) {
        console.log('Error:', err);
        process.exit(1);
    }

});