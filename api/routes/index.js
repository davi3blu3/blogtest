var express = require('express');
var router = express.Router();
var ctrlPosts = require('../controllers/post.ctrl.js');
var ctrlUsers = require('../controllers/user.ctrl.js');

router
    .route('/posts')
    .get(ctrlPosts.postsGetAll)
    .post(ctrlPosts.insertNewPost);

router
    .route('/posts/:postId')
    .get(ctrlPosts.getOnePost)
    .put(ctrlPosts.updateOnePost)
    .delete(ctrlPosts.deleteOnePost);

router
    .route('/newuser')
    .post(ctrlUsers.register);

router
    .route('/login')
    .post(ctrlUsers.login);

module.exports = router;
