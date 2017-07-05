'use strict';

const bluebird = require('bluebird');

const promisified = new Set();

module.exports = {
    all(target, options = {}) {
        if (promisified.has(target)) {
            return;
        }
        bluebird.promisifyAll(target, options);
        promisified.add(target);
    }
};
