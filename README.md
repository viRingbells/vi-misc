# vi-misc
A set of utils or whatever ...

# Install
Install with npm

    npm install vi-misc

# Handle
Handle is used to execute a set of middlewares(generator functions) the same as [koa](http://koajs.com/) does.
Usage :

    var handle = require('vi-misc').handle;
    handle(middlewares, context, callback);

# Yieldable
Yiedable is a syntactic sugar to create yieldable functions.
Usage :

    var y = require('vi-misc').yieldable;
    var fn = y(function(arg1, arg2, done){
        //TODO
    });

`fn` is the same as

    function(arg1, arg2){
        return function(done){
            //TODO
        }
    }
