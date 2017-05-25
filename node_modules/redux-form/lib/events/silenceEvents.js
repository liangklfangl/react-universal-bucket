'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _silenceEvent = require('./silenceEvent');

var _silenceEvent2 = _interopRequireDefault(_silenceEvent);

var silenceEvents = function silenceEvents(fn) {
  return function (event) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return _silenceEvent2['default'](event) ? fn.apply(undefined, args) : fn.apply(undefined, [event].concat(args));
  };
};

exports['default'] = silenceEvents;
module.exports = exports['default'];