'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.style = undefined;

var _templateObject = _taggedTemplateLiteral(['\n  display: block;\n  width: 100%;\n  position: relative;\n  padding: ', ';\n\n  label {\n    position: absolute;\n    display: block;\n    font-size: 11px;\n    padding: 0 10px;\n    top: 0.3em;\n    width: 100%;\n    color: ', ';\n\n    > span { color: ', '; } \n  }\n\n  input {\n    opacity: ', ';\n    outline: none;\n    margin: 0;\n    box-sizing: border-box;\n    display: block;\n    appearance: none;\n    border-top: solid 0.5em transparent;\n    border-bottom: solid 0.5em transparent;\n    padding: 0.5em;\n    width: 100%;\n    height: 2.5em;\n    border-radius: 0.8em/1.1em;\n    font-size: 1em;\n    cursor: pointer;\n    background: linear-gradient(', ', ', ') padding-box, 50% 50% border-box;\n    background-size: 100% 100%;\n  }\n\n  ', '\n\n ', '\n\n ', '\n\n  input::-moz-focus-outer {\n    border: 0;\n  }\n'], ['\n  display: block;\n  width: 100%;\n  position: relative;\n  padding: ', ';\n\n  label {\n    position: absolute;\n    display: block;\n    font-size: 11px;\n    padding: 0 10px;\n    top: 0.3em;\n    width: 100%;\n    color: ', ';\n\n    > span { color: ', '; } \n  }\n\n  input {\n    opacity: ', ';\n    outline: none;\n    margin: 0;\n    box-sizing: border-box;\n    display: block;\n    appearance: none;\n    border-top: solid 0.5em transparent;\n    border-bottom: solid 0.5em transparent;\n    padding: 0.5em;\n    width: 100%;\n    height: 2.5em;\n    border-radius: 0.8em/1.1em;\n    font-size: 1em;\n    cursor: pointer;\n    background: linear-gradient(', ', ', ') padding-box, 50% 50% border-box;\n    background-size: 100% 100%;\n  }\n\n  ', '\n\n ', '\n\n ', '\n\n  input::-moz-focus-outer {\n    border: 0;\n  }\n']);

var _styledComponents = require('styled-components');

var _autoPrefix = require('../../utils/autoPrefix');

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); } /*
                                                                                                                                                  Based on:
                                                                                                                                                   http://codepen.io/thebabydino/pen/NPYBJQ
                                                                                                                                                   http://codepen.io/thebabydino/pen/zxRzPw
                                                                                                                                                   http://codepen.io/thebabydino/pen/dPqrrY
                                                                                                                                                   http://codepen.io/thebabydino/pen/YPOPxr
                                                                                                                                                  */

var style = exports.style = function style(_ref) {
  var theme = _ref.theme,
      percent = _ref.percent,
      disabled = _ref.disabled,
      withLabel = _ref.withLabel;
  return (0, _styledComponents.css)(_templateObject, withLabel ? '1.2em 0' : '0', theme.base06, theme.base04, disabled ? '0.5' : '1', theme.base02, theme.base00, (0, _autoPrefix.prefixSelectors)('input', ['webkit-slider-runnable-track', 'moz-range-track', 'ms-track'], '{\n    position: relative;\n    height: 0.8em;\n    border-radius: 0.5em;\n    box-shadow: 0 0 .125em ' + theme.base04 + ';\n    background: linear-gradient(' + theme.base01 + ', ' + theme.base02 + ' 40%, ' + theme.base01 + ')\n      no-repeat ' + theme.base00 + ';\n    background-size: ' + percent + '% 100%;\n  }'), (0, _autoPrefix.prefixSelectors)('input', ['webkit-slider-thumb', 'moz-range-thumb', 'ms-thumb'], '{\n    position: relative;\n    appearance: none;\n    cursor: ew-resize;\n    margin-top: -0.36em;\n    background: ' + (theme.light ? theme.base00 : theme.base06) + ';\n    border: solid 1px ' + theme.base03 + ';\n    box-shadow: 0 1px .125em ' + theme.base03 + ';\n    width: 1.5em;\n    height: 1.5em;\n    border-radius: 50%;\n    cursor: pointer;\n  }'), (0, _autoPrefix.prefixSelectors)('input:focus:not(:active)', ['webkit-slider-thumb', 'moz-range-thumb', 'ms-thumb'], '{\n    box-shadow: 0 0 1px 2px ' + theme.base0D + ';\n  }'));
};