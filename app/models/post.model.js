var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
    username: String,
    postMessage: {
        type: String,
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
    }
});

mongoose.model('Post', postSchema, 'posts');