module.exports = function(subject, argv, callback){
    if(!callback){
        callback = argv;
        argv = undefined;
    }
    var context = {
        argv : argv,
        result : [],
    };
    return handle(subject, context, function(){
        callback.apply(context, [context.error].concat(context.result))
    });
}

var handle = function(subject, context, callback){
    context = context || {};
    if(!callback || typeof callback != 'function') callback = function(){};
    if(Array.isArray(subject)) return handleArray(subject, context, callback);
    if(typeof subject == 'function'){
        if(subject.constructor.name == 'GeneratorFunction'){
            return handleGenerator(subject, context, callback);
        }
        return handleFunction(subject, context, callback);
    };
    if(subject instanceof Promise){
        return handlePromise(subject, context, callback);
    };
    context.result = subject;
    delete context.error;
    return callback();
};

function _(context, callback){
    var called = false;
    var next = function(){
        if(called) throw new Error('Result handler can only be called once');
        called = true;
        delete context.error;
        delete context.result;
        args = [].slice.call(arguments);
        var err = args[0];
        args = args[1];
        if(err)  context.error  = err;
        if(args) context.result = args;
        callback();
    };
    return next;
}

function _t(context, callback){
    var res = {};
    res.throwed = false;
    context.throw = function(error){
        if(res.throwed) throw new Error("Can not throw twice in one generator");
        res.throwed = true;
        context.error = error;
        return callback();
    };
    return res;
}

function handleArray(subjectList, context, callback){
    function next(index){
        if(index >= subjectList.length){
            return callback();
        }
        var subject = subjectList[index++];
        if(context.error){
            if(subject.length < 2) return next(index);
        }
        handle(subject, context, function(){
            next(index);
        });
    };
    next(0);
};

function handleFunction(subject, context, callback){
    if(!!context.error ^ subject.length >= 2) return callback();
    var t = _t(context, callback);
    var param = !!context.error ? [context.error] : [];
    var next = _(context, function(){
        return !!t.throwed || callback();
    });
    context.next = next;
    try{
        subject.apply(context, param.concat(next));
    }
    catch(e){
        return next(e);
    }
};

function handleGenerator(subject, context, callback){
    if(!!context.error ^ subject.length >= 2) return callback();
    var t = _t(context, callback);
    var gen = null;
    if(subject.length == 2){
        gen = subject.call(context, context.error);
    }
    else {
        gen = subject.call(context);
    }
    function next(){
        var res = gen.next(context.result);
        if(res.done){
            context.result = res.value;
            return t.throwed || callback();
        }
        handle(res.value, context, function(){
            if(t.throwed || context.error) return callback();
            else return next();
        });
    };
    next();
};

function handlePromise(subject, context, callback){

};
