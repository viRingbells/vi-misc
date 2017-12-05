/**
 * Test of path utils
 **/
'use strict';

const path    = require('path');
const mpath   = require('vi-misc').path;

describe('path.root', () => {
    it('should be the directory of the main script', (done) => {
        const root = path.dirname(process.mainModule.filename);
        mpath.root.should.be.exactly(root);
        done();
    });
});

describe('path.absolute', () => {
    it('should be a function', (done) => {
        mpath.absolute.should.be.an.instanceof(Function);
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
        error.should.be.an.instanceof(Error);
        done();
    });
});

describe('path.split', () => {
    it('should be a function', (done) => {
        mpath.split.should.be.an.instanceof(Function);
        done();
    });
    it('should split a path into array', (done) => {
        const mypath = "path/to/file.js";
        const split = mpath.split(mypath);
        split.should.be.an.instanceof(Array).with.lengthOf(3);
        split[0].should.be.exactly('path');
        split[1].should.be.exactly('to');
        split[2].should.be.exactly('file.js');
        done();
    });
    it('should split a path with back slashes into array', (done) => {
        const mypath = "path\\/with\\/specails/to/file.js";
        const split = mpath.split(mypath);
        split.should.be.an.instanceof(Array).with.lengthOf(3);
        split[0].should.be.exactly('path\\/with\\/specails');
        split[1].should.be.exactly('to');
        split[2].should.be.exactly('file.js');
        done();
    });
    it('should split a path with special chars into array', (done) => {
        const mypath = "path@with:specails/to/file.js";
        const split = mpath.split(mypath);
        split.should.be.an.instanceof(Array).with.lengthOf(3);
        split[0].should.be.exactly('path@with:specails');
        split[1].should.be.exactly('to');
        split[2].should.be.exactly('file.js');
        done();
    });
    it('should split a path with given sep', (done) => {
        const mypath = "path\\.with\\.specails.to.value";
        const split = mpath.split(mypath, '.');
        split.should.be.an.instanceof(Array).with.lengthOf(3);
        split[0].should.be.exactly('path\\.with\\.specails');
        split[1].should.be.exactly('to');
        split[2].should.be.exactly('value');
        done();
    });
});
