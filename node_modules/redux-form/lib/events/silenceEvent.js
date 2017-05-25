'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _isEvent = require('./isEvent');

var _isEvent2 = _interopRequireDefault(_isEvent);

var silenceEvent = function silenceEvent(event) {
  var is = _isEvent2['default'](event);
  if (is) {
    event.preventDefault();
  }
  return is;
};

exports['default'] = silenceEvent;
module.exports = exports['default'];