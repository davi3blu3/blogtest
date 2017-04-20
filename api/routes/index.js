var express = require('express');
var router = express.Router();
var ctrlPosts = require('../controllers/post.ctrl.js');

router
    .route('/posts')
    .get(ctrlPosts.postsGetAll)
    .post(ctrlPosts.insertNewPost);

router
    .route('/posts/:id')
    .put(ctrlPosts.updateOnePost)
    .delete(ctrlPost.deleteOnePost);    

module.exports = router;
