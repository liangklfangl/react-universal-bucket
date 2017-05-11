'use strict';

var _getFormNames = require('../getFormNames');

var _getFormNames2 = _interopRequireDefault(_getFormNames);

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

var describeGetFormNames = function describeGetFormNames(name, structure, expect) {
  var getFormNames = (0, _getFormNames2.default)(structure);

  var fromJS = structure.fromJS,
      getIn = structure.getIn;


  describe(name, function () {
    it('should return a function', function () {
      expect(getFormNames()).toBeA('function');
    });

    it('should get the form names from state', function () {
      expect(getFormNames()(fromJS({
        form: {
          foo: {
            values: {
              dog: 'Snoopy',
              cat: 'Garfield'
            }
          },
          bar: {
            values: {
              dog: 'Fido',
              cat: 'Whiskers'
            }
          }
        }
      }))).toEqualMap(['foo', 'bar']);
    });

    it('should use getFormState if provided', function () {
      expect(getFormNames(function (state) {
        return getIn(state, 'someOtherSlice');
      })(fromJS({
        someOtherSlice: {
          foo: {
            values: {
              dog: 'Snoopy',
              cat: 'Garfield'
            }
          },
          bar: {
            values: {
              dog: 'Fido',
              cat: 'Whiskers'
            }
          }
        }
      }))).toEqualMap(['foo', 'bar']);
    });
  });
};

describeGetFormNames('getFormNames.plain', _plain2.default, (0, _addExpectations2.default)(_expectations2.default));
describeGetFormNames('getFormNames.immutable', _immutable2.default, (0, _addExpectations2.default)(_expectations4.default));