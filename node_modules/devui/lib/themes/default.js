"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = function (colors) {
  return _extends({}, colors, {
    fontFamily: "'Source Sans Pro', sans-serif",
    codeFontFamily: "'Source Code Pro', monospace",
    inputHeight: 30,
    inputBorderWidth: 1,
    inputBorderRadius: 4,
    spinnerSize: 13, // Math.floor(theme.inputHeight / 2) - 2
    inputPadding: 10, // theme.inputHeight / 3
    selectArrowWidth: 4, // Math.floor(theme.inputHeight / 7)
    inputInternalHeight: 28, // theme.inputHeight - theme.inputBorderWidth * 2
    inputBorderColor: colors.base02,
    inputFocusedStyle: "border-color: " + colors.base0D
  });
};