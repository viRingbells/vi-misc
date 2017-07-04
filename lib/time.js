/**
 * Time helper
 **/
'use strict';

const $       = require('lodash');
const assert  = require('assert');
const misc   = require('..');

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DAY    = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const time = {
    format (template, date = new Date()) {
        assert('string' === typeof template, 'Format must be a string!');
        assert(date instanceof Date, 'Date to parse must be an instance of Date!');
        const map = [
            ['Year',  date.getFullYear(),      4],
            ['Month', MONTHS[date.getMonth()], 0],
            ['Date',  misc.number.th(date.getDate()), 0],
            ['Day',   DAY[date.getDay()],      0],
            ['Y+',    date.getFullYear(),      4],
            ['M+',    date.getMonth() + 1,     2],
            ['D+',    date.getDate(),          2],
            ['W+',    date.getDay(),           2],
            ['H+',    date.getHours(),         2],
            ['I+',    date.getMinutes(),       2],
            ['S+',    date.getSeconds(),       2],
            ['U+',    date.getMilliseconds(),  3],
        ];

        for (let item of map) {
            let [key, value, defaultPadding] = item;
            let content = value.toString();
            const regexp = new RegExp('(^|[^\\\\])(' + key + ')(\\d+)?', 'g');
            template = template.replace(regexp, (matched, prefix, target, padding = defaultPadding) => {
                if (padding > 0) {
                    if ('number' === typeof value) {
                        content = $.padStart(content, padding, '0');
                    }
                    else {
                        content = content.slice(0, padding);
                    }
                    content = content.replace(/(Y|M|D|W|H|I|S|U)/g, '\\$1');
                }
                return prefix + content;

            });
        }
        return template.replace(/\\(.)/g, '$1');
    }
};

module.exports = time;
