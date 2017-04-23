var express = require('express');
var router = express.Router();
var ctrlPosts = require('../controllers/post.ctrl.js');
var ctrlUsers = require('../controllers/user.ctrl.js');

// Post routes
router
    .route('/posts')
    .get(ctrlPosts.postsGetAll)         // get all posts
    .post(ctrlPosts.insertNewPost);     // submit new post

router
    .route('/posts/:postId')
    .get(ctrlPosts.getOnePost)          // get one post
    .put(ctrlPosts.updateOnePost)       // update one post
    .delete(ctrlPosts.deleteOnePost);   // delete one post

// User routes - Authentication
router
    .route('/newuser')
    .post(ctrlUsers.register);          // register new user

router
    .route('/loginuser')
    .post(ctrlUsers.login);             // login existing user

module.exports = router;
