var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
    username: String,
    content: {
        type: String,
        maxlength: 440,
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
            maxlength: 360
        },
        author: String,
        commentDate: Date
    }],
    tags: [String]
});

mongoose.model('Post', postSchema, 'posts');