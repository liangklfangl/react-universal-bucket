'use strict';

var _getFormAsyncErrors = require('../getFormAsyncErrors');

var _getFormAsyncErrors2 = _interopRequireDefault(_getFormAsyncErrors);

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

var describeGetFormAsyncErrors = function describeGetFormAsyncErrors(name, structure, expect) {
  var getFormAsyncErrors = (0, _getFormAsyncErrors2.default)(structure);

  var fromJS = structure.fromJS,
      getIn = structure.getIn;


  describe(name, function () {
    it('should return a function', function () {
      expect((0, _getFormAsyncErrors2.default)('foo')).toBeA('function');
    });

    it('should get the form values from state', function () {
      expect(getFormAsyncErrors('foo')(fromJS({
        form: {
          foo: {
            asyncErrors: {
              dog: 'Snoopy',
              cat: 'Garfield'
            }
          }
        }
      }))).toEqualMap({
        dog: 'Snoopy',
        cat: 'Garfield'
      });
    });

    it('should return undefined if there are no asyncErrors', function () {
      expect(getFormAsyncErrors('foo')(fromJS({
        form: {
          foo: {}
        }
      }))).toEqual(undefined);
    });

    it('should use getFormState if provided', function () {
      expect(getFormAsyncErrors('foo', function (state) {
        return getIn(state, 'someOtherSlice');
      })(fromJS({
        someOtherSlice: {
          foo: {
            asyncErrors: {
              dog: 'Snoopy',
              cat: 'Garfield'
            }
          }
        }
      }))).toEqualMap({
        dog: 'Snoopy',
        cat: 'Garfield'
      });
    });
  });
};

describeGetFormAsyncErrors('getFormAsyncErrors.plain', _plain2.default, (0, _addExpectations2.default)(_expectations2.default));
describeGetFormAsyncErrors('getFormAsyncErrors.immutable', _immutable2.default, (0, _addExpectations2.default)(_expectations4.default));