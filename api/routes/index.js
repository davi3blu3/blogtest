var express = require('express');
var router = express.Router();
var ctrlPosts = require('../controllers/post.ctrl.js');

router
    .route('/posts')
    .get(ctrlPosts.postsGetAll)         // testing ... working
    .post(ctrlPosts.insertNewPost);     // testing ... working

router // is this line neccessary?
    .route('/posts/:postId')
    .get(ctrlPosts.getOnePost)          // testing ... working
    .put(ctrlPosts.updateOnePost)       // testing ... working
    .delete(ctrlPosts.deleteOnePost);   // testing ... working

module.exports = router;
