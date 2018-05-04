/**
 * Error with custom code and other properties
 **/
'use strict';

const assert  = require('assert');

module.exports = class extends Error {

    constructor(message, props = {}) {
        super(message);
        if ('string' === typeof props) {
            props = { code: props };
        }
        assert(props instanceof Object,
            'Invalid second argument for error properties, should be a string or an object');
        Object.assign(this, props);
    }

};
