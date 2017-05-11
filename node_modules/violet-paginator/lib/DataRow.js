'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DataRow = DataRow;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _decorators = require('./decorators');

var _stateManagement = require('./lib/stateManagement');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function DataRow(_ref) {
  var record = _ref.record,
      updating = _ref.updating,
      removing = _ref.removing,
      headers = _ref.headers;

  var classes = (0, _classnames2.default)({ updating: updating, removing: removing });
  var columns = headers.map(function (h) {
    var field = h.field,
        format = h.format;

    var data = record[field];
    var displayData = format && format(r, i) || data;

    return _react2.default.createElement(
      'td',
      { key: field },
      displayData
    );
  });

  return _react2.default.createElement(
    'tr',
    { className: classes },
    columns
  );
}

exports.default = (0, _decorators.withRecordProps)(DataRow);