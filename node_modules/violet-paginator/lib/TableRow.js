'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = TableRow;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function TableRow(_ref) {
  var record = _ref.record,
      index = _ref.index,
      updating = _ref.updating,
      removing = _ref.removing,
      headers = _ref.headers;

  var classes = (0, _classnames2.default)({ updating: updating, removing: removing });
  var columns = headers.map(function (h) {
    var field = h.field,
        format = h.format;

    var data = record[field];
    var displayData = format && format(record, index) || data;

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

TableRow.propTypes = {
  record: _react.PropTypes.object.isRequired,
  updating: _react.PropTypes.bool,
  removing: _react.PropTypes.bool,
  index: _react.PropTypes.number.isRequired,
  headers: _react.PropTypes.arrayOf(_react.PropTypes.shape({
    format: _react.PropTypes.func,
    field: _react.PropTypes.string.isRequired
  })).isRequired
};