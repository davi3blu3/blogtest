var mongoose = require('mongoose');
var db = require('../data/dbconnection.js');
var Post = mongoose.model('Post');

// generic error handler - http requests
function errorHandler(err) {
    console.log('ERROR:', err);
    res.status(500).send(err);        
}

// GET /posts - retrieve all posts in decending date order
module.exports.postsGetAll = function(req, res){
    Post.find()
        .sort({ createdOn: -1 })
        .exec(function(err, posts){
            if (err) errorHandler(err);
            else {
                console.log('Found posts: ', posts.length);
                res.status(200).json(posts);
            }
        });
}

// POST /posts - write a new post to database
module.exports.insertNewPost = function(req, res){
    console.log('insertNewPost called');
    console.log(req.user);

    var newPost = {
        "message": req.body.message,
        "username": req.body.username,
        "createdOn": new Date()
    };
    console.log(newPost);
    Post.create(newPost, function(err, post) {
            if (err) errorHandler(err);
            else {
                res.status(200).send(post);
            }
        })
}

// GET /posts/:postId - retrieve single post
module.exports.getOnePost = function(req, res){
    var postId = req.params.postId;
    Post.findById(postId)
        .exec(function(err, post){
            if (err) errorHandler(err);
            else {
                console.log('Found post: ', post);
                res.status(200).json(post);
            }
        })
}

// PUT /posts/:postId - update a single post
module.exports.updateOnePost = function(req, res){
    var postId = req.params.postId;
    var update = { $set: { message: req.body.message }};
    var options = { new: true };

    Post.findByIdAndUpdate(postId, update, options, function(err, newPost){
        if (err) errorHandler(err);
        else {
            console.log('else condition met, sending response');
            console.log(newPost);
            res.status(200).json(newPost);
        }        
    });
}

// DELETE /posts/:postID - delete a single post
module.exports.deleteOnePost = function(req, res){
    var postId = req.params.postId;

    Post.findByIdAndRemove(postId, {}, function(err){
        if (err) errorHandler(err);
        else {
            res.status(204).send();
        }
    });

}
