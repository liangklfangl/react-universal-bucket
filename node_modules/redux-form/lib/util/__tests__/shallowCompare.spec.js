'use strict';

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _shallowCompare = require('../shallowCompare');

var _shallowCompare2 = _interopRequireDefault(_shallowCompare);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('shallowCompare', function () {
  it('should shallow compare props and state', function () {
    (0, _expect2.default)((0, _shallowCompare2.default)({
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

    (0, _expect2.default)((0, _shallowCompare2.default)({
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

    (0, _expect2.default)((0, _shallowCompare2.default)({
      props: {
        a: aProp
      },
      state: {
        b: bState
      }
    }, { a: aProp }, { b: [1, 2, 3] })).toBe(true);
  });
});