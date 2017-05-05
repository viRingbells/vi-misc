'use strict';

const mfunc = require('..').function;

describe('function.once', () => {
    it('should be called only once for a function', (done) => {
        let result = 0;
        function increase() {
            result++;
        }
        increase = mfunc.once(increase);
        result.should.be.exactly(0);
        increase();
        result.should.be.exactly(1);
        increase();
        result.should.be.exactly(1);
        done();
    });
    it('should be called only once for a set of function', (done) => {
        let result = 0;
        function increase1() {
            result++;
        }
        function increase2() {
            result++;
        }
        function increase3() {
            result++;
        }
        function increase4() {
            result++;
        }
        [increase1, increase2, increase3, increase4] = mfunc.once(increase1, increase2, increase3, increase4);
        result.should.be.exactly(0);
        increase1();
        result.should.be.exactly(1);
        increase2();
        result.should.be.exactly(1);
        increase3();
        result.should.be.exactly(1);
        increase4();
        result.should.be.exactly(1);
        done();
    });
});

describe('function.limit', () => {
    it('should restrict the called count within a given number', (done) => {
        let result = 0;
        let overflow = 0;
        function increase1() {
            result++;
        }
        function increase2() {
            result++;
        }
        function increase3() {
            result++;
        }
        function increase4() {
            result++;
        }
        [increase1, increase2, increase3, increase4] = mfunc.limit([increase1, increase2, increase3, increase4],
            { limit: 2, limited: () => { overflow++ }});
        result.should.be.exactly(0);
        overflow.should.be.exactly(0);
        increase1();
        result.should.be.exactly(1);
        overflow.should.be.exactly(0);
        increase2();
        result.should.be.exactly(2);
        overflow.should.be.exactly(0);
        increase3();
        result.should.be.exactly(2);
        overflow.should.be.exactly(1);
        increase4();
        result.should.be.exactly(2);
        overflow.should.be.exactly(2);
        done();
    });
});
