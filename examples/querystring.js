require('..').querystring;

var str = 'a=b&c=d&hello=world';

console.log(str.toQueryObject());

var obj = {
    'c' : 'd',
    'e' : 'f',
    'foo' : 'bar',
};

console.log(obj.toQueryString());
