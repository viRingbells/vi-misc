module.exports = handle;

var co      = require('co');
var compose = require('koa-compose');

function handle(middlewares, context, callback){
    if(!callback){
        callback = context;
        context = {};
    }
    middlewares.unshift(function*(next){
        var err;
        try{
            yield next;
        }
        catch(e){
            err = e;
        }
        if('function' == typeof callback) return callback(err, this);
        if(err) throw err;
    });
    var gen = compose(middlewares);
    var fn  = co.wrap(gen);
    fn.call(context);
}
