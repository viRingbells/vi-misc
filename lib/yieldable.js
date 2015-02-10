module.exports = function (fn){
    return function(){
        var args = [].slice.call(arguments);
        return function(done){
            var called = false;
            var me = {};
            me.done = function(data){
                if(called) throw new Error("Can not call done after done or throw called");
                called = true;
                done(null, data);
            };
            me.throw = function(err){
                if(called) throw new Error("Can not call throw after done or throw called");
                called = true;
                done(err);
            };
            args.push(done);
            fn.apply(me, args);
        }
    }
};
