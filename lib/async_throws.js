module.exports = _throws;

function _throws(done, fn){
    return function(){
        var args = [].slice.call(arguments);
        try{
            fn.apply(fn, args);
        }
        catch(e){
            done(e);
        }
    }
}
