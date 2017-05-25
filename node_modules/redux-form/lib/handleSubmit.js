'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _isPromise = require('is-promise');

var _isPromise2 = _interopRequireDefault(_isPromise);

var _isValid = require('./isValid');

var _isValid2 = _interopRequireDefault(_isValid);

var handleSubmit = function handleSubmit(submit, values, props, asyncValidate) {
  var dispatch = props.dispatch;
  var fields = props.fields;
  var startSubmit = props.startSubmit;
  var stopSubmit = props.stopSubmit;
  var submitFailed = props.submitFailed;
  var returnRejectedSubmitPromise = props.returnRejectedSubmitPromise;
  var touch = props.touch;
  var validate = props.validate;

  var syncErrors = validate(values, props);
  touch.apply(undefined, fields); // touch all fields
  if (_isValid2['default'](syncErrors)) {
    var doSubmit = function doSubmit() {
      var result = submit(values, dispatch);
      if (_isPromise2['default'](result)) {
        startSubmit();
        return result.then(function (submitResult) {
          stopSubmit();
          return submitResult;
        }, function (submitError) {
          stopSubmit(submitError);
          if (returnRejectedSubmitPromise) {
            return Promise.reject(submitError);
          }
        });
      }
      return result;
    };
    var asyncValidateResult = asyncValidate();
    return _isPromise2['default'](asyncValidateResult) ?
    // asyncValidateResult will be rejected if async validation failed
    asyncValidateResult.then(doSubmit, function () {
      submitFailed();
      return returnRejectedSubmitPromise ? Promise.reject() : Promise.resolve();
    }) : doSubmit(); // no async validation, so submit
  }
  submitFailed();
};

exports['default'] = handleSubmit;
module.exports = exports['default'];