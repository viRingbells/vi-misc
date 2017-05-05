/**
 * Function相关
 **/
const assert = require('assert');

module.exports = {
    /**
     * Functions in the list in all can only be executed one time
     **/
    once(...funcList) {
        funcList = this.limit(funcList);
        return funcList.length === 1 ? funcList[0] : funcList;
    },
    limit(funcList, options = {}) {
        let called = 0;
        funcList = funcList.map(func => {
            return (...args) => {
                if (called >= (options.limit || 1)) {
                    if (options.limited instanceof Function) {
                        options.limited(func, args, called);
                    }
                    return;
                }
                called++;
                return func(...args);
            }
        });
        return funcList;
    },
};
