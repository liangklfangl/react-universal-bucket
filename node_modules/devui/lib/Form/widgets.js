'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Select = require('../Select');

var _Select2 = _interopRequireDefault(_Select);

var _Slider = require('../Slider');

var _Slider2 = _interopRequireDefault(_Slider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

/* eslint-disable react/prop-types */
var SelectWidget = function SelectWidget(_ref) {
  var options = _ref.options,
      multi = _ref.multi,
      rest = _objectWithoutProperties(_ref, ['options', 'multi']);

  return _react2.default.createElement(_Select2.default, _extends({ options: options.enumOptions, multiple: multi }, rest));
};

var RangeWidget = function RangeWidget(_ref2) {
  var schema = _ref2.schema,
      readonly = _ref2.readonly,
      autofocus = _ref2.autofocus,
      label = _ref2.label,
      options = _ref2.options,
      formContext = _ref2.formContext,
      registry = _ref2.registry,
      rest = _objectWithoutProperties(_ref2, ['schema', 'readonly', 'autofocus', 'label', 'options', 'formContext', 'registry']);

  return _react2.default.createElement(_Slider2.default, _extends({}, rest, {
    autoFocus: autofocus,
    readOnly: readonly,
    min: schema.minimum,
    max: schema.maximum,
    step: schema.multipleOf,
    withValue: true
  }));
};

exports.default = { SelectWidget: SelectWidget, RangeWidget: RangeWidget };