var koa = require('koa');
var y = require('..').yieldable;

var app = koa();

var async1 = y(function(arg1, arg2){
    setTimeout(function(){
        this.done("[ASYNC1 : " + arg1 + "," + arg2 + "]");
    }.bind(this));
});

var async2 = y(function(arg1, arg2){
    setTimeout(function(){
        this.done("[ASYNC2 : " + arg1 + "," + arg2 + "]");
        //or throw error with the following statement:
        //this.throw(new Error("How are you"));
    }.bind(this));
});

app.use(function*(next){
    var res1 = yield async1('vi','misc');
    var res2 = yield async2(res1, 'foo');
    this.body = res2;
});

app.on('error',function(err){
    console.log(err);
});

app.listen(8333);
