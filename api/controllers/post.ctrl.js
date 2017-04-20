module.exports.postsGetAll = function(req, res){
    console.log('GET received to route index');
    res
        .status(200)
        .json({"accessedRoutes": true});
    // db.collection('posts').find({}).sort({ createdOn: -1 }).toArray(function(err, docs) {
    //     if (err) errorHandler(err);
    //     else {                
    //         res.status(200).json(docs);
    //     }
    // });
}

module.exports.insertNewPost = function(req, res){
    var newPost = {
        "message": req.body.message,
        "name": req.body.name,
        "createdOn": new Date()
    };
    db.collection('posts').insertOne(newPost, function(err, doc) {
        if (err) errorHandler(err);
        else {
            res.status(200).send();
        }
    })    
}