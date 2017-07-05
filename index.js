/**
 * Misc utils
 **/
'use strict';

module.exports = {
    get path() {
        return require('./lib/path');
    },
    get number() {
        return require('./lib/number');
    },
    get time() {
        return require('./lib/time');
    },
    get function() {
        return require('./lib/function');
    },
    get object() {
        return require('./lib/object');
    },
};