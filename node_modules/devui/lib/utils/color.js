'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _color = require('color');

var _color2 = _interopRequireDefault(_color);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
  Apply color effects like
    effect('#ffffff', 'darken', 0.5);
    effect('#000000', 'lighten', 0.5);
    effect('#000000', 'alpha', 0.5);
*/

exports.default = function (color, effect, val) {
  return new _color2.default(color)[effect](val).hsl().string();
};

// TODO: memoize it