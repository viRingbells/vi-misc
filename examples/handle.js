var handle = require('..').handle;

var middlewares = [];

middlewares.push(function*(next){
    console.log('handling middleware 1');
    console.log('    next in 1000ms');
    yield function(done){
        setTimeout(function(){
            console.log('    ok');
            done();
        },1000);
    };
    yield next;
});

middlewares.push(function*(next){
    console.log('handling middleware 2')
    console.log('    next immediately');
    var a = yield function(done){
        setTimeout(function(){ done(null, 'AA')});
    };
    console.log('    ok');
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

handle(middlewares, ['A', 'B'], function(err){
    console.log("All middlewares handled");   
    if(err) console.log("Error:" + err.message);
});
