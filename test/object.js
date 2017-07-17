'use strict';

const mobj  = require('vi-misc').object;
const should  = require('should');

describe('object.each', () => {
    const obj = {
        a: 'A',
        b: 'B',
        c: {
          dd: 'DD',
          ee: ['E1', 'E2', 'E3', 'E4'],
          ff: [{
            ggg: 'GGG',
            hhh: 'HHH',
          }, {
            iii: 'III',
            jjj: {
              kkkk: 'KKKK',
              llll: 'LLLL',
            }
          }],
        }
    };

    const arr = ['0000', obj, '2222', obj];

    it('should scan all properties', async () => {
        let count = 0;
        mobj.each(obj, (property, ...keys) => {
            count++;
            let target = obj;
            for (let key of keys.reverse()) {
                target = target[key];
            }
            target.match(/^[A-Z]+\d*$/).should.be.ok;
        });
        count.should.be.exactly(12);
    });

    it('should scan in a certain depth limit', async () => {
        let count = 0;
        mobj.each(obj, (property, ...keys) => {
            count++;
            let target = obj;
            for (let key of keys.reverse()) {
                target = target[key];
            }
            if (!(target instanceof Object)) {
                target.match(/^[A-Z]$/).should.be.ok;
            }
        }, 1);
        count.should.be.exactly(3);
    });
});

describe('object.has/get/set', () => {
    const object = {
        a: {
            bb: 'bb-value',
            cc: {
                ddd: 'ddd-value',
                eee: 'eee-value',
            },
        },
    };

    it('should return true on object.hasByKeys with existing keys', async () => {
        mobj.hasByKeys(object, "a").should.be.ok;
        mobj.hasByKeys(object, "a", "bb").should.be.ok;
        mobj.hasByKeys(object, "a", "cc").should.be.ok;
        mobj.hasByKeys(object, "a", "cc", "ddd").should.be.ok;
        mobj.hasByKeys(object, "a", "cc", "eee").should.be.ok;
    });

    it('should return false on object.hasByKeys with none-existing keys', async () => {
        mobj.hasByKeys(object, "z").should.not.be.ok;
        mobj.hasByKeys(object, "a", "zz").should.not.be.ok;
        mobj.hasByKeys(object, "a", "cc", "zzz").should.not.be.ok;
        mobj.hasByKeys(object, "a", "cc", "ddd", "zzz").should.not.be.ok;
    });

    it('should return the value on object.getByKeys', async () => {
        mobj.getByKeys(object, "a").should.be.an.instanceof(Object);
        mobj.getByKeys(object, "a").should.have.property('bb', 'bb-value');
        mobj.getByKeys(object, "a", "cc", "ddd").should.be.exactly('ddd-value');
        should(mobj.getByKeys(object, "a", "xx", "yyy", "zzzz")).be.exactly(undefined);
    });

    it('should set the value on object.setByKeys', async () => {
        mobj.setByKeys(object, "a-new-ddd-value", "a", "cc", "ddd");
        mobj.getByKeys(object, "a", "cc", "ddd").should.be.exactly("a-new-ddd-value");
        mobj.setByKeys(object, "a-new-zzzz-value", "a", "xx", "yyy", "zzzz");
        mobj.getByKeys(object, "a", "xx", "yyy", "zzzz").should.be.exactly("a-new-zzzz-value");
    });
});
