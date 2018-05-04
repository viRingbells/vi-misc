'use strict';

const MError = require('vi-misc').Error;

describe('error', () => {

    it('should assign code as "MY_CODE"', (done) => {
        let error = new MError('my message', 'MY_CODE');
        error.should.be.an.instanceOf(Error);
        error.should.have.property('message', 'my message');
        error.should.have.property('code', 'MY_CODE');
        done();
    });

    it('should assign foo as "BAR"', (done) => {
        let error = new MError('my message', { foo: 'BAR' });
        error.should.have.property('message', 'my message');
        error.should.have.property('foo', 'BAR');
        done();
    });

});
