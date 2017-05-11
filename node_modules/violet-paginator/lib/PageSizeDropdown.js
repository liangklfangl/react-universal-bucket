'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PageSizeDropdown = PageSizeDropdown;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _decorators = require('./decorators');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultOptions = [15, 25, 50, 100];

function PageSizeDropdown(_ref) {
  var pageSize = _ref.pageSize,
      pageActions = _ref.pageActions,
      _ref$options = _ref.options,
      options = _ref$options === undefined ? defaultOptions : _ref$options;

  var optionTags = options.map(function (n) {
    return _react2.default.createElement(
      'option',
      { key: n, value: n },
      n
    );
  });

  var setPageSize = function setPageSize(e) {
    return pageActions.setPageSize(parseInt(e.target.value, 10));
  };

  return _react2.default.createElement(
    'select',
    { value: pageSize, onChange: setPageSize },
    optionTags
  );
}

PageSizeDropdown.propTypes = {
  pageSize: _react.PropTypes.number,
  pageActions: _react.PropTypes.object,
  options: _react.PropTypes.array
};

exports.default = (0, _decorators.stretch)(PageSizeDropdown);