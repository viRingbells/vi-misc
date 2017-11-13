/**
 * Utils on objects
 **/
'use strict';

const assert    = require('assert');
const extend    = require('extend');

module.exports = {
    /**
     * Deep clone a object
     **/
    clone(target) {
        if (Array.isArray(target)) {
            return extend(true, [], target);
        }
        if (target instanceof Object) {
            return extend(true, {}, target);
        }
        return target;
    },

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
            let index = null;
            for (index = 0; index < target.length; index++) {
                target[index] = this.each(target[index], handler, depth, keys.concat([index])) || target[index];
            }
            return target;
        }
        let key = null;
        for (key in target) {
            target[key] = this.each(target[key], handler, depth, keys.concat([key])) || target[key];
        }
        return target;
    },
    /**
     * Check if a child exists
     **/
    hasByKeys(target, ...keys) {
        assert(target instanceof Object, 'Target object must be an object');
        assert(keys.length >= 0, 'Invalid keys for hasByKeys');

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
        assert(target instanceof Object, 'Target object must be an object');
        assert(keys.length >= 0, 'Invalid keys for getByKeys');

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
        assert(target instanceof Object, 'Target object must be an object');
        assert(keys.length >= 0, 'Invalid keys for setByKeys');

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
