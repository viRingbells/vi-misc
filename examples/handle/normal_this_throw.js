var handle = require('../..').handle;

var middlewares = [];

middlewares.push(function(){
    console.log('handling middleware 1');
    console.log('    throw error in 1000ms');
    setTimeout(function(){
        return this.throw(new Error("This is a FAKED error"));
    }.bind(this),1000);
});

middlewares.push(function(){
    console.log('handling middleware 2')
    console.log('    next immediately');
    return this.next();
});

middlewares.push(function(){
    console.log('handling middleware 3');
    console.log('    next in 1000ms');
    setTimeout(function(){
        return this.next();
    }.bind(this),1000);
});

middlewares.push(function(error, next){
    console.log('handling error middleware 1');
    console.log('Error is ' + error.message);
    console.log('    next in 1000ms');
    setTimeout(function(){
        return this.next();
    }.bind(this), 1000);
});

handle(middlewares, ['A', 'B'], function(error){
    console.log("All middlewares handled");
    if(error) console.log("Error : " + error.message);
});
