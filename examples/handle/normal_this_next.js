var handle = require('../..').handle;

var middlewares = [];

middlewares.push(function(){
    console.log('handling middleware 1');
    console.log('    next in 1000ms');
    setTimeout(function(){
        return this.next();
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

handle(middlewares, ['A', 'B'], function(){
    console.log("All middlewares handled");   
});
