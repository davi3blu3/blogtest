var express = require('express');
var router = express.Router();
var ctrlPosts = require('../controllers/post.ctrl.js');
var ctrlUsers = require('../controllers/user.ctrl.js');

// Post routes
router
    .route('/posts')
    .get(ctrlPosts.postsGetAll)                                 // get all posts
    .post(ctrlUsers.authenticate, ctrlPosts.insertNewPost);     // submit new post, requires auth

router
    .route('/posts/:postId')
    .get(ctrlPosts.getOnePost)                                  // get one post
    .put(ctrlUsers.authenticate, ctrlPosts.updateOnePost)       // update one post, requires auth
    .delete(ctrlUsers.authenticate, ctrlPosts.deleteOnePost);   // delete one post, requires auth

// User routes - Authentication
router
    .route('/newuser')
    .post(ctrlUsers.register);          // register new user

router
    .route('/loginuser')
    .post(ctrlUsers.login);             // login existing user

module.exports = router;
