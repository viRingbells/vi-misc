/**
 * Path utils
 **/
'use strict';

const assert  = require('assert');
const path    = require('path');

module.exports = {
    /**
     * Get the root path of the current program
     **/
    get root() {
        const root = path.dirname(process.mainModule.filename);
        return root;
    },

    /**
     * Check if target is a string
     **/
    check(target) {
        const targetType = typeof target;
        assert('string' === targetType, 'Type error, target should be a string, ' +
                            `${targetType} given`);
    },

    /**
     * Make the given path into a absolute path
     **/
    absolute(target) {
        this.check(target);
        if (!path.isAbsolute(target)) {
            target = path.join(this.root, target);
        }
        return path.normalize(target);
    },

    /**
     * Split path into array
     **/
    split(target) {
        this.check(target);
        const sep = path.sep;
        const parts = target.split(sep).reverse();
        const result = [];
        let part = null;
        for (part of parts) {
            if (part.endsWith('\\')) {
                result[result.length - 1] = part + sep + result[result.length - 1];
            }
            else {
                result.push(part);
            }
        }
        return result.reverse();
    }
};
