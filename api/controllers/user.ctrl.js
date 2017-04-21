var mongoose = require('mongoose');
var User = mongoose.model('User');
var bcrypt = require('bcrypt');

module.exports.register = function(req, res){
    console.log('registering user');
    var username = req.body.username;
    var password = req.body.password;

    User.create({
        username: username,
        password: bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    }, function(err, user){
        if (err) {
            console.log(err);
            res.status(400).json(err);
        } else {
            console.log('user created');
            res.status(201).json(newUser);
        }
    })
}

module.exports.login = function(req, res){
    console.log('logging in user');
    var username = req.body.username;
    var password = req.body.password;

    User.findOne({
        username: username,
    }).exec(function(err, user){
        if (err) {
            console.log(err);
            res.status(400).json(err);
        } else {
            if (bcrypt.compareSync(password, user.password)) {
                console.log('User found: ', user);
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
