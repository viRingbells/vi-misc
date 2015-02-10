var handle = require('../..').handle;

var middlewares = [];

middlewares.push(function*(next){
    console.log('handling middleware 1');
    console.log('    next in 1000ms');
    yield function(done){
        setTimeout(function(){
            done();
        },1000);
    };
});

middlewares.push(function*(next){
    console.log('handling middleware 2')
    console.log('    next immediately');
    var a = yield function(done){
        setTimeout(function(){ done(null, 'AA')});
    };
    return 'result';
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

handle(middlewares, ['A', 'B'], function(){
    console.log("All middlewares handled");   
});
