var express = require('express');
var router = express.Router();
var ctrlPosts = require('../controllers/post.ctrl.js');
var db = require('../data/dbconnection.js');

// generic error handler - http requests
function errorHandler(err) {
    console.log('ERROR:', err);
    res.status(500).send(err);        
}

router
    .route('/posts')
    .get(ctrlPosts.postsGetAll)
    .post(ctrlPosts.insertNewPost);

module.exports = router;