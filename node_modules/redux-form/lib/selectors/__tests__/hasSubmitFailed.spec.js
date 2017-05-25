'use strict';

var _hasSubmitFailed = require('../hasSubmitFailed');

var _hasSubmitFailed2 = _interopRequireDefault(_hasSubmitFailed);

var _plain = require('../../structure/plain');

var _plain2 = _interopRequireDefault(_plain);

var _expectations = require('../../structure/plain/expectations');

var _expectations2 = _interopRequireDefault(_expectations);

var _immutable = require('../../structure/immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _expectations3 = require('../../structure/immutable/expectations');

var _expectations4 = _interopRequireDefault(_expectations3);

var _addExpectations = require('../../__tests__/addExpectations');

var _addExpectations2 = _interopRequireDefault(_addExpectations);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var describeHasSubmitFailed = function describeHasSubmitFailed(name, structure, expect) {
  var hasSubmitFailed = (0, _hasSubmitFailed2.default)(structure);

  var fromJS = structure.fromJS,
      getIn = structure.getIn;


  describe(name, function () {
    it('should return a function XXX', function () {
      expect(hasSubmitFailed('foo')).toBeA('function');
    });

    it('should return false when value not present', function () {
      expect(hasSubmitFailed('foo')(fromJS({
        form: {}
      }))).toBe(false);
    });

    it('should return true when submitting', function () {
      expect(hasSubmitFailed('foo')(fromJS({
        form: {
          foo: {
            submitFailed: true
          }
        }
      }))).toBe(true);
    });

    it('should use getFormState if provided', function () {
      expect(hasSubmitFailed('foo', function (state) {
        return getIn(state, 'someOtherSlice');
      })(fromJS({
        someOtherSlice: {
          foo: {
            submitFailed: true
          }
        }
      }))).toBe(true);
    });
  });
};

describeHasSubmitFailed('hasSubmitFailed.plain', _plain2.default, (0, _addExpectations2.default)(_expectations2.default));
describeHasSubmitFailed('hasSubmitFailed.immutable', _immutable2.default, (0, _addExpectations2.default)(_expectations4.default));