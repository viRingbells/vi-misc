/**
 * Path utils
 **/
'use strict';

const assert  = require('assert');
const path    = require('path');

const root = path.dirname(process.mainModule.filename);

module.exports = {
    /**
     * Get the root path of the current program
     **/
    get root() {
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
        const splitted = target.split(sep).reverse();
        const result = [];
        for (const item of splitted) {
            if (item.endsWith("\\")) {
                result[result.length - 1] = item + sep + result[result.length - 1];
            }
            else {
                result.push(item);
            }
        }
        return result.reverse();
    }
};
