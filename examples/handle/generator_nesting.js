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
    var b = yield nesting;
    console.log('b is ' + b);
    return 'result';
});

function* nesting(next){
    console.log('handling nesting generator 1');
    return yield function(done){
        setTimeout(function(){
            done(new Error("A Error in NESTING"));
        },1000);
    };
};

middlewares.push(function*(next){
    console.log('handling middleware 3');
    console.log('    next in 1000ms');
    yield function(done){
        setTimeout(function(){
            done();
        },1000);
    };
});

handle(middlewares, ['A', 'B'], function(error){
    console.log("All middlewares handled");
    if(error) console.log(error.message);
});
