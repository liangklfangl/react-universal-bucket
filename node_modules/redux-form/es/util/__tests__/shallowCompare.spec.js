import expect from 'expect';
import shallowCompare from '../shallowCompare';

describe('shallowCompare', function () {
  it('should shallow compare props and state', function () {
    expect(shallowCompare({
      props: {
        a: 'a'
      },
      state: {
        b: 'b'
      }
    }, { a: 'a' }, { b: 'b' })).toBe(false);
  });

  it('should shallow compare props and state', function () {
    var aProp = new Date();
    var bState = [1, 2, 3];

    expect(shallowCompare({
      props: {
        a: aProp
      },
      state: {
        b: bState
      }
    }, { a: aProp }, { b: bState })).toBe(false);
  });

  it('should shallow compare props and state', function () {
    var aProp = new Date();
    var bState = [1, 2, 3];

    expect(shallowCompare({
      props: {
        a: aProp
      },
      state: {
        b: bState
      }
    }, { a: aProp }, { b: [1, 2, 3] })).toBe(true);
  });
});