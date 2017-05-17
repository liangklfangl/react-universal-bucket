'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTheme = exports.listThemes = exports.listSchemes = exports.schemes = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _themes = require('../themes');

var themes = _interopRequireWildcard(_themes);

var _nicinabox = require('redux-devtools-themes/lib/nicinabox');

var _nicinabox2 = _interopRequireDefault(_nicinabox);

var _base = require('base16');

var baseSchemes = _interopRequireWildcard(_base);

var _colorSchemes = require('../colorSchemes');

var additionalSchemes = _interopRequireWildcard(_colorSchemes);

var _invertColors = require('../utils/invertColors');

var _invertColors2 = _interopRequireDefault(_invertColors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var schemes = exports.schemes = _extends({}, baseSchemes, additionalSchemes);
var listSchemes = exports.listSchemes = function listSchemes() {
  return Object.keys(schemes).slice(1).sort();
}; // remove `__esModule`
var listThemes = exports.listThemes = function listThemes() {
  return Object.keys(themes);
};

var getTheme = exports.getTheme = function getTheme(_ref) {
  var type = _ref.theme,
      scheme = _ref.scheme,
      light = _ref.light;

  var colors = void 0;
  if (scheme === 'default') {
    colors = light ? schemes.default : _nicinabox2.default;
  } else {
    colors = schemes[scheme];
    if (light) colors = (0, _invertColors2.default)(colors);
  }

  var theme = _extends({
    type: type,
    light: light
  }, themes.default(colors));
  if (type !== 'default') {
    theme = _extends({}, theme, themes[type](colors));
  }

  return theme;
};