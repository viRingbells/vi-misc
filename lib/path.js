/**
 * Path utils
 **/
'use strict';

const debug   = require('debug')('misc.path');
const path    = require('path');

root = path.dirname(process.mainModule.filename);

module.exports = {
    /**
     * Get the root path of the current program
     **/
    get root() {
        return root;
    },
    /**
     * Make the given path into a absolute path
     **/
    absolute(target) {
        const targetType = typeof target;
        if ('string' !== targetType) {
            throw new Error('Type error, argument 1 for misc.path.absolute() should be a string, ' +
                            `${targetType} given`);
        }
        if (!path.isAbsolute(target)) {
            target = path.join(this.root, target);
        }
        return path.normalize(target);
    }
};
