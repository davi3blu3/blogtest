var mongoose = require('mongoose');

var db = require('../data/dbconnection.js');
var Post = mongoose.model('Post');

// generic error handler - http requests
function errorHandler(err) {
    console.log('ERROR:', err);
    res.status(500).send(err);        
}

module.exports.postsGetAll = function(req, res){
    Post.find()
        .sort({ createdOn: -1 })
        .exec(function(err, posts){
            console.log('Found posts: ', posts.length);
            res.status(200).json(posts);
        });
}

module.exports.insertNewPost = function(req, res){
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
}

module.exports.getOnePost = function(req, res){
    var postId = req.params.postId;
    // get post
}

module.exports.updateOnePost = function(req, res){
    var postId = req.params.postId;
    var updateDoc = req.body;
    delete updateDoc._id;
    updateDoc.updatedOn = new Date();

    db.collection('posts').updateOne({_id: new ObjectID(postId)}, updateDoc, function(err, doc) {
        if (err) errorHandler(err);
        else {
            res.status(204).send();
        }
    })
}

module.exports.deleteOnePost = function(req, res){
    var postId = req.params.postId;
    db.collection('posts').deleteOne({_id: new ObjectID(postId)}, function(err, result) {
        if (err) errorHandler(err);
        else {
            res.status(204).send()
        }
    })  
}