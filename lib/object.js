/**
 * Utils on objects
 **/
'use strict';

const assert    = require('assert');

module.exports = {
    /**
     * Traverse all properties on the target
     **/
    each(target, handler, depth = -1, keys = []) {
        if (!(target instanceof Object) || depth === 0) {
            keys = keys.reverse();
            return handler(target, ...keys);
        }
        depth > 0 && depth--;
        if (Array.isArray(target)) {
            for (let index = 0; index < target.length; index++) {
                target[index] = this.each(target[index], handler, depth, keys.concat([index])) || target[index];
            }
            return target;
        }
        for (let key in target) {
            target[key] = this.each(target[key], handler, depth, keys.concat([key])) || target[key];
        }
        return target;
    },
    /**
     * Check if a child exists
     **/
    hasByKeys(target, ...keys) {
        assert(keys.length >= 1, 'No keys for hasByKeys');
        let pointer = target;
        let key = null;
        for (key of keys) {
            if (!(pointer instanceof Object) || !pointer.hasOwnProperty(key)) {
                return false;
            }
            pointer = pointer[key];
        }
        return true;
    },
    /**
     * Return the child with a sequence of keys
     **/
    getByKeys(target, ...keys) {
        assert(keys.length >= 1, 'No keys for getByKeys');
        let pointer = target;
        let key = null;
        for (key of keys) {
            if (!(pointer instanceof Object) || !pointer.hasOwnProperty(key)) {
                return undefined;
            }
            pointer = pointer[key];
        }
        return pointer;
    },
    /**
     * Set a child with a sequence of keys
     **/
    setByKeys(target, value, ...keys) {        
        assert(keys.length >= 1, 'No keys for setByKeys');
        let pointer = target;
        let lastKey = keys.pop();
        let key = null;
        for (key of keys) {
            if (!(pointer instanceof Object) || !pointer.hasOwnProperty(key)) {
                pointer[key] = {};
            }
            pointer = pointer[key];
        }
        assert(pointer instanceof Object, 'Can not assign value on an none-object');
        pointer[lastKey] = value;
        return value;
    },
};
