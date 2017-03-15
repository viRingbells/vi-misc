/**
 * Test of path utils
 **/
'use strict';

const debug   = require('debug')('misc.test.path');
const path    = require('path');
const mpath   = require('..').path;

describe('path.root', () => {
    it('should be the directory of the main script', (done) => {
        const root = path.dirname(process.mainModule.filename);
        mpath.root.should.be.exactly(root);
        done();
    });
});

describe('path.absolute', () => {
    it('should be a function', (done) => {
        mpath.absolute.should.be.an.instanceOf(Function);
        done();
    });
    it('should parse a relative path into absolute path', (done) => {
        const rpath = 'abc';
        const apath = mpath.absolute(rpath);
        path.isAbsolute(apath).should.be.exactly(true);
        path.relative(mpath.root, apath).should.be.exactly(rpath);
        done();
    });
    it('should not parse absolute path', (done) => {
        const apath = '/aa/bb/cc';
        mpath.absolute(apath).should.be.exactly(apath);
        done();
    });
    it('should throw error if input is not string', (done) => {
        const epath = ['this', 'is', 'not', 'a', 'path'];
        let error = {};
        try { mpath.absolute(epath); } catch (e) { error = e; }
        error.should.be.an.instanceOf(Error);
        done();
    });
});
