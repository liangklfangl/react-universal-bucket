'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.DataTable = DataTable;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactFontawesome = require('react-fontawesome');

var _reactFontawesome2 = _interopRequireDefault(_reactFontawesome);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _SortLink = require('./SortLink');

var _SortLink2 = _interopRequireDefault(_SortLink);

var _decorators = require('./decorators');

var _pageInfoTranslator = require('./pageInfoTranslator');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function DataTable(props) {
  var results = props.results,
      headers = props.headers,
      isLoading = props.isLoading,
      updating = props.updating,
      removing = props.removing,
      _props$className = props.className,
      className = _props$className === undefined ? 'border' : _props$className;


  if (isLoading) {
    return _react2.default.createElement(
      'center',
      null,
      _react2.default.createElement(_reactFontawesome2.default, {
        name: 'spinner',
        spin: true,
        size: '5x'
      })
    );
  }

  var headerRow = headers.map(function (h) {
    return _react2.default.createElement(
      'th',
      { key: h.field },
      _react2.default.createElement(_SortLink2.default, _extends({}, props, h))
    );
  });

  var rows = results.map(function (r, i) {
    var columns = headers.map(function (h) {
      var field = h.field,
          format = h.format;

      var data = r.get(field);
      var displayData = format && format(r, i) || data;

      return _react2.default.createElement(
        'td',
        { key: field },
        displayData
      );
    });

    var classes = (0, _classnames2.default)({
      updating: updating.includes(r.get((0, _pageInfoTranslator.recordProps)().identifier)),
      removing: removing.includes(r.get((0, _pageInfoTranslator.recordProps)().identifier))
    });

    return _react2.default.createElement(
      'tr',
      { className: classes, key: 'results-' + i },
      columns
    );
  });

  return _react2.default.createElement(
    'table',
    { className: className },
    _react2.default.createElement(
      'thead',
      null,
      _react2.default.createElement(
        'tr',
        null,
        headerRow
      )
    ),
    _react2.default.createElement(
      'tbody',
      null,
      rows
    )
  );
}

DataTable.propTypes = {
  headers: _react.PropTypes.array.isRequired,
  isLoading: _react.PropTypes.bool,
  results: _react.PropTypes.object,
  updating: _react.PropTypes.object,
  removing: _react.PropTypes.object,
  className: _react.PropTypes.string
};

exports.default = (0, _decorators.tabulate)(DataTable);