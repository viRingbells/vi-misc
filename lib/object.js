/**
 * Utils on objects
 **/
'use strict';

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
    }
};
