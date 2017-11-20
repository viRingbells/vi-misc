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


describe('promisify.catchError', () => {
    it('should catch and return error', (done) => {
        function throw_error() {
            return Promise.reject(new Error("Faked Error"));
        }
        mpromisify.catchError(throw_error()).then(error => {
            error.should.be.an.instanceOf(Error).with.property('message', 'Faked Error');
            done();
        });
    });
    it('should return null if no error thrown', (done) => {
        function throw_no_errors() {
            return Promise.resolve();
        }
        mpromisify.catchError(throw_no_errors()).then(error => {
            (error === null).should.be.ok;
            done();
        });
    });
});
