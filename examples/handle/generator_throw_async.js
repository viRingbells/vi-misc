var handle = require('../..').handle;
var as     = require('../..').async_throws;

var middlewares = [];

middlewares.push(function*(next){
    console.log('handling middleware 1');
    console.log('    throw in yield async in 1000ms');
    var me = this;
    yield function(done){
        setTimeout(as(done, function(){
            throw new Error('This is a FAKED error');
        }),1000);
    };
});

middlewares.push(function*(next){
    console.log('handling middleware 2')
    console.log('    next immediately');
    yield next;
});

middlewares.push(function*(next){
    console.log('handling middleware 3');
    console.log('    next in 1000ms');
    yield function(done){
        setTimeout(function(){
            done();
        },1000);
    };
});

middlewares.push(function*(error, next){
    console.log('handling error middleware 1')
    console.log('Error : [' + error.message + ']');
});

handle(middlewares, ['A', 'B'], function(){
    console.log("All middlewares handled");   
});
