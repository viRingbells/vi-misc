/**
 * Tests of number
 **/
'use strict';

const number = require('..').number;

describe('for number.th', () => {
    it('should return 1st, 2nd, 3rd, 4th, 5th ...', done => {
        number.th(1).should.be.exactly('1st');
        number.th(2).should.be.exactly('2nd');
        number.th(3).should.be.exactly('3rd');
        number.th(4).should.be.exactly('4th');
        number.th(5).should.be.exactly('5th');
        number.th(10).should.be.exactly('10th');
        number.th(11).should.be.exactly('11th');
        number.th(12).should.be.exactly('12th');
        number.th(13).should.be.exactly('13th');
        number.th(15).should.be.exactly('15th');
        number.th(20).should.be.exactly('20th');
        number.th(21).should.be.exactly('21st');
        number.th(22).should.be.exactly('22nd');
        number.th(23).should.be.exactly('23rd');
        number.th(31).should.be.exactly('31st');
        number.th(101).should.be.exactly('101st');
        number.th(111).should.be.exactly('111th');
        number.th(121).should.be.exactly('121st');
        done();
    });
});
