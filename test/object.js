'use strict';

const mobj  = require('vi-misc').object;

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

    it('should clone an object', async () => {
        let b = mobj.clone(obj);
        b.c.ff[1].jjj.kkkk.should.be.exactly('KKKK');
        b.c.ff[1].jjj.kkkk = 'KKKK2';
        b.c.ff[1].jjj.kkkk.should.be.exactly('KKKK2');
        obj.c.ff[1].jjj.kkkk.should.be.exactly('KKKK');
    });
});
