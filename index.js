/**
 * Misc utils
 **/
'use strict';

module.exports = {
    get function() {
        return require('./lib/function');
    },
    get number() {
        return require('./lib/number');
    },
    get object() {
        return require('./lib/object');
    },
    get path() {
        return require('./lib/path');
    },
    get async() {
        return require('./lib/async');
    },
    get time() {
        return require('./lib/time');
    },
    get error() {
        return require('./lib/error');
    },
    get Error() {
        return this.error;
    },
};
