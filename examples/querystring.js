var qs = require('..').querystring;

var str = 'a=b&c=d&hello=world';

console.log(qs.parseToQueryObject(str));

var obj = {
    'c' : 'd',
    'e' : 'f',
    'foo' : 'bar',
};

console.log(qs.parseToQueryString(obj));
