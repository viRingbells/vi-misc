'use strict';

const fs          = require('fs');
const mpromisify  = require('vi-misc').promisify;

describe('promisify.all', () => {
    it('should promisify the functions only once', (done) => {
        mpromisify.all(fs);
        fs.readFileAsync.should.be.an.instanceof(Function);
        let error = {};
        try {
            mpromisify.all(fs);
        }
        catch (e) {
            error = e;
        }
        error.should.not.be.an.instanceof(Error);
        done();
    });
});
