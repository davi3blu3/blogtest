var mongoose = require('mongoose');
var User = mongoose.model('User');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

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
                var token = jwt.sign(
                    {username: user.username },
                    's3cr3t',
                    { expiresIn: 3600 }
                );
                res.status(200).json({ success: true, token: token });
            } else {
                res.status(401).json('Unauthorized');
            }
        }
    })
}

module.exports.authenticate = function(req, res, next){
    var headerExists = req.headers.authorization;
    if (headerExists) {
        var token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, 's3cr3t', function(err, decoded){
            if (err){
                console.log(err);
                res.status(401).json('Unauthorized');
            } else {
                req.user = decoded.username;
                next();
            }
        })
    } else {
        res.status(403).json('No token provided');
    }
}