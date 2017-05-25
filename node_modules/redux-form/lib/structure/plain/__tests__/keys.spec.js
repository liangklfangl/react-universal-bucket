'use strict';

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _keys = require('../keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('structure.plain.keys', function () {
  it('should return empty array if state is undefined', function () {
    (0, _expect2.default)((0, _keys2.default)(undefined)).toEqual([]);
  });

  it('should return empty if no keys', function () {
    (0, _expect2.default)((0, _keys2.default)({})).toEqual([]);
  });

  it('should return keys', function () {
    (0, _expect2.default)((0, _keys2.default)({
      a: 1,
      b: 2,
      c: 3
    })).toEqual(['a', 'b', 'c']);
  });
});