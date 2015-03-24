'use strict';

exports.parseToQueryObject = function (str) {
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

exports.parseToQueryString = function (obj) {
    var qs = '';
    for (var i in obj) {
        if (i == 'toQueryString') {
            continue;
        } 
        qs += '&' + i + '=' + obj[i];
    }

    if (qs) {
        return qs.slice(1);
    }

    return qs;
};
