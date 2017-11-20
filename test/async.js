'use strict';

const fs      = require('fs');
const masync  = require('vi-misc').async;


describe('async.all', () => {
    it('should promisify the functions only once', (done) => {
        masync.all(fs);
        fs.readFileAsync.should.be.an.instanceof(Function);
        let error = {};
        try {
            masync.all(fs);
        }
        catch (e) {
            error = e;
        }
        error.should.not.be.an.instanceof(Error);
        done();
    });
});


describe('async.catchError', () => {
    it('should catch and return error', (done) => {
        function throw_error() {
            return Promise.reject(new Error("Faked Error"));
        }
        masync.catchError(throw_error()).then(error => {
            error.should.be.an.instanceOf(Error).with.property('message', 'Faked Error');
            done();
        });
    });
    it('should return null if no error thrown', (done) => {
        function throw_no_errors() {
            return Promise.resolve();
        }
        masync.catchError(throw_no_errors()).then(error => {
            (error === null).should.be.ok;
            done();
        });
    });
});
