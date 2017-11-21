/**
 * Utils on objects
 **/
'use strict';

const assert    = require('assert');
const extend    = require('extend');

const misc_object = {
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
     * Merge one object to another, returns a new one
     **/
    merge(original, ...sources) {
        original = misc_object.clone(original);
        return extend(true, original, ...sources);
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
    pointByKeys(target, create, ...keys) {
        let pointer = target;
        let key = null;
        for (key of keys) {
            if (!(pointer instanceof Object) || !pointer.hasOwnProperty(key)) {
                if (!create) {
                    return undefined;
                }
                pointer[key] = {};
            }
            pointer = pointer[key];
        }
        return pointer;
    },
    /**
     * Return the child with a sequence of keys
     **/
    getByKeys(target, ...keys) {
        assert(target instanceof Object, 'Target object must be an object');
        assert(keys.length >= 0, 'Invalid keys for getByKeys');
        return this.pointByKeys(target, false, ...keys);
    },
    /**
     * Check if a child exists
     **/
    hasByKeys(target, ...keys) {
        assert(keys.length >= 0, 'Invalid keys for hasByKeys');
        const key = keys.pop();
        const pointer = misc_object.pointByKeys(target, false, ...keys);
        return pointer !== undefined && pointer.hasOwnProperty(key);
    },
    /**
     * Set a child with a sequence of keys
     **/
    setByKeys(target, value, ...keys) {        
        assert(keys.length >= 0, 'Invalid keys for setByKeys');
        const key = keys.pop();
        const pointer = misc_object.pointByKeys(target, true, ...keys);
        assert(pointer instanceof Object, 'Can not assign value on an none-object');
        pointer[key] = value;
        return value;
    },
    /**
     * Remove a child with a sequence of keys
     **/
    removeByKeys(target, ...keys) {
        assert(keys.length >= 0, 'Invalid keys for removeByKeys');
        const key = keys.pop();
        const pointer = misc_object.pointByKeys(target, false, ...keys);
        if (pointer === undefined || !pointer.hasOwnProperty(key)) {
            return;
        }
        delete pointer[key];
    },
};

module.exports = misc_object;
