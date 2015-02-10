var handle = require('../..').handle;

var middlewares = [];

middlewares.push(function*(next){
    console.log('handling middleware 1');
    console.log('    throw in yield immediately');
    var me = this;
    yield function(done){
        throw new Error('This is a FAKED error');
        setTimeout(function(){
        },1000);
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
