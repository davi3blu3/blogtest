var express = require('express');
var router = express.Router();
var db = require('../app/data/dbconnection.js');

// generic error handler - http requests
function errorHandler(err) {
    console.log('ERROR:', err);
    res.status(500).send(err);        
}

router
    .route('/posts')
    // GET /POSTS : Retrieve all posts
    .get(function(req, res) {
        console.log('GET received to route index');
        res
          .status(200)
          .json({"accessedRoutes": true});
        // db.collection('posts').find({}).sort({ createdOn: -1 }).toArray(function(err, docs) {
        //     if (err) errorHandler(err);
        //     else {                
        //         res.status(200).json(docs);
        //     }
        // });
    })

    // POST /POSTS : Create one new post
    .post(function(req, res) {
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

module.exports = router;