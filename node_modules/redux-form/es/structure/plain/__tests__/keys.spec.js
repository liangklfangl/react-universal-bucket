import expect from 'expect';
import keys from '../keys';

describe('structure.plain.keys', function () {
  it('should return empty array if state is undefined', function () {
    expect(keys(undefined)).toEqual([]);
  });

  it('should return empty if no keys', function () {
    expect(keys({})).toEqual([]);
  });

  it('should return keys', function () {
    expect(keys({
      a: 1,
      b: 2,
      c: 3
    })).toEqual(['a', 'b', 'c']);
  });
});