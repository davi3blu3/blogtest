var mongoose = require('mongoose');
var dburl = 'mongodb://localhost:27017/testblog';

mongoose.connect(dburl);

// listen for database connection events
mongoose.connection.on('connected', function(){
    console.log('Mongoose connected to ', dburl);
});
mongoose.connection.on('disconnected', function(){
    console.log('Mongoose disconnected');
});
mongoose.connection.on('error', function(err){
    console.log('Mongoose connection error: ', err);
});

// listen for process termination events
process.on('SIGINT', function(){
    mongoose.connection.close(function(){
        console.log('Mongoose disconnected through app termination (SIGINT)');
        process.exit(0);
    });
});
process.on('SIGTERM', function(){
    mongoose.connection.close(function(){
        console.log('Mongoose disconnected through app termination (SIGTERM)');
        process.exit(0);
    });
});
process.once('SIGUSR2', function(){
    mongoose.connection.close(function(){
        console.log('Mongoose disconnected through app termination (SIGUSR2)');
        // handle nodemon restarts
        process.kill(process.pid, 'SIGUSR2');
    });
});

// Bring in schemas and models
require('./post.model.js');
require('./user.model.js');