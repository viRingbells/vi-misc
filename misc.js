'use strict';

var fs   = require('fs');
var path = require('path');

var lib  = path.join(__dirname, 'lib');
var fns  = fs.readdirSync(lib);

fns.forEach(function(fn){
    fn = path.basename(fn, path.extname(fn));
    exports.__defineGetter__(fn, (function(fn){
        return function(){
            return require(path.join(lib, fn));
        };
    })(fn));
});
