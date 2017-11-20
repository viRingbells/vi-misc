/**
 * Utils on functions
 **/
'use strict';

module.exports = {
    /**
     * Functions in the list in all can only be executed one time
     **/
    once(...func_list) {
        func_list = this.limit(func_list);
        return func_list.length === 1 ? func_list[0] : func_list;
    },
    limit(func_list, options = {}) {
        let called = 0;
        func_list = func_list.map(func => {
            return (...args) => {
                if (called >= (options.limit || 1)) {
                    if (options.limited instanceof Function) {
                        options.limited(func, args, called);
                    }
                    return;
                }
                called++;
                return func(...args);
            };
        });
        return func_list;
    },
};
