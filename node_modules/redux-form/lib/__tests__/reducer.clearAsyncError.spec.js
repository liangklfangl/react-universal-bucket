'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actions = require('../actions');

var describeClearAsyncError = function describeClearAsyncError(reducer, expect, _ref) {
  var fromJS = _ref.fromJS;
  return function () {
    it('should do nothing on clear submit with no previous state', function () {
      var state = reducer(undefined, (0, _actions.clearAsyncError)('foo'));
      expect(state).toEqualMap({
        foo: {}
      });
    });

    it('should clear async errors with previous state', function () {
      var state = reducer(fromJS({
        myForm: {
          asyncErrors: {
            foo: 'some validation message here',
            baar: 'second validation message'
          }
        }
      }), (0, _actions.clearAsyncError)('myForm', 'foo'));
      expect(state).toEqualMap({
        myForm: {
          asyncErrors: {
            baar: 'second validation message'
          }
        }
      });
    });
  };
};

exports.default = describeClearAsyncError;