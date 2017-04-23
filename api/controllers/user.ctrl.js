var mongoose = require('mongoose');
var User = mongoose.model('User');
var bcrypt = require('bcrypt');

module.exports.register = function(req, res){
    User.create({
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    }, function(err, user){
        if (err) {
            console.log(err);
            res.status(400).json(err);
        } else {
            res.status(201).json(user);
        }
    })
}

module.exports.login = function(req, res){
    User.findOne({
        username: req.body.username,
    }).exec(function(err, user){
        if (err) {
            console.log(err);
            res.status(400).json(err);
        } else {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                res.status(200).json(user);
            } else {
                res.status(401).json('Unauthorized');
            }
        }
    })
}

// API STRUCTURE
// /posts GET              - retrieve all posts in decending date order
// /posts POST             - insert a new post into db

// /posts/:postId GET      - retrieve one post
// /posts/:postId POST     - add comment to one post
// /posts/:postId PUT      - edit one post
// /posts/:postId DELETE   - delete one post

// /newuser POST           - register a new user
// /login   POST           - authenticate existing user
