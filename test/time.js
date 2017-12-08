/**
 * Tests of utils.time
 **/
'use strict';

const time = require('vi-misc').time;

describe('time.format', () => {
    const date = new Date();
    date.setFullYear(2016);
    date.setMonth(8); // refer to september
    date.setDate(28);
    date.setHours(9);
    date.setMinutes(24);
    date.setSeconds(1);
    date.setMilliseconds(53);

    it('should be 2016-09-28 09:24:01.053 for YYYY-MM-DD HH:II:SS.UUU', done => {
        time.format('YYYY-MM-DD HH:II:SS.UUU', date).should.be.exactly('2016-09-28 09:24:01.053');
        done();
    });

    it('should be Thu, 28th Sept 2016 for Day3, Date Month4 Year', done => {
        time.format('Day3, Date Month4 Year', date).should.be.exactly('Thu, 28th Sept 2016');
        done();
    });

    it('should be ok with default time(now)', done => {
        time.format('Day3, Date Month4 Year').should.be.ok;
        done();
    });
});
