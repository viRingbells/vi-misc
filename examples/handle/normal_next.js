var handle = require('../..').handle;

var middlewares = [];

middlewares.push(function(next){
    console.log('handling middleware 1');
    console.log('    next in 1000ms');
    setTimeout(function(){
        return next(null, 'RESULT');
    },1000);
});

middlewares.push(function(next){
    console.log('handling middleware 2')
    console.log(this);
    console.log('    next immediately');
    return next();
});

middlewares.push(function(next){
    console.log('handling middleware 3');
    console.log(this);
    console.log('    next in 1000ms');
    setTimeout(function(){
        return next();
    },1000);
});

handle(middlewares, ['A', 'B'], function(){
    console.log("All middlewares handled");   
});
