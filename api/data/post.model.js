var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    content: {
        type: String,
        maxlength: 480,
        required: true
    },
    postDate: {
        type: Date,
        required: true
    },
    likes: {
        type: Number,
        min: 0,
        "default": 0
    },
    comments: [{
        content: {
            type: String,
            maxlength: 240
        },
        author: String,
        commentDate: Date
    }],
    tags: [String]
});

mongoose.model('Post', postSchema, 'posts');