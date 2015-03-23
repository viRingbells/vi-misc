'use strict';

String.prototype.toQueryObject = function () {
    var str = this.toString();
    var query = {};
    str.split('&').forEach(function (item) {          
        item = item.split('=');                                
        if (item.lenth > 2) {                                  
            item[1] = item.slice(1).join('=');                 
        }                                                      
        query[item[0]] = item[1];                              
    });
    return query;
};

Object.prototype.toQueryString = function () {
    var qs = '';
    for (var i in this) {
        if (i == 'toQueryString') {
            continue;
        } 
        qs += '&' + i + '=' + this[i];
    }

    if (qs) {
        return qs.slice(1);
    }

    return qs;
};
