import expect from 'expect';
import { is, fromJS, Map, List } from 'immutable';
import keys from '../keys';

var expectEqual = function expectEqual(a, b) {
  return expect(is(a, b)).toBe(true);
};

describe('structure.immutable.keys', function () {
  it('should return empty List if state is undefined', function () {
    expectEqual(keys(undefined), List());
  });

  it('should return empty List if no keys', function () {
    expectEqual(keys(Map()), List());
  });

  it('should return keys', function () {
    expectEqual(keys(fromJS({
      a: 1,
      b: 2,
      c: 3
    })), List(['a', 'b', 'c']));
  });
});