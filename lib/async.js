'use strict';

const bluebird = require('bluebird');

const promisified = new Set();


const miscAsync = {
    all(target, options = {}) {
        if (promisified.has(target)) {
            return;
        }
        bluebird.promisifyAll(target, options);
        promisified.add(target);
    },
    catchError(promise) {
        return new Promise(resolve => {
            promise.then(() => resolve(null))
                .catch(error => resolve(error));
        });
    },
};


module.exports = miscAsync;
