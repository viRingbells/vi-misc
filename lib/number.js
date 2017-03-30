/**
 * Number helpers
 **/
'use strict';

const assert  = require('assert');

const number = {
    th (n) {
        assert(Number.isInteger(n), 'Number input for th() must be an integer!');
        if (parseInt((n / 10) % 10) === 1) return n + 'th';
        switch (n % 10) {
            case 1:
                return n + 'st';
            case 2:
                return n + 'nd';
            case 3:
                return n + 'rd';
            default:
                return n + 'th';
        }
    }
}

module.exports = number;
