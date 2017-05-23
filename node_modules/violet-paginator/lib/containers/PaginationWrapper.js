'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PaginationWrapper = exports.connector = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _actions = require('../actions');

var _actions2 = _interopRequireDefault(_actions);

var _reducer = require('../reducer');

var _stateManagement = require('../lib/stateManagement');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var connector = exports.connector = (0, _reactRedux.connect)(function (state, ownProps) {
  return {
    paginator: (0, _stateManagement.preloadedPaginator)(state, ownProps.listId, ownProps.preloaded)
  };
}, function (dispatch, ownProps) {
  return {
    pageActions: (0, _redux.bindActionCreators)((0, _actions2.default)(ownProps), dispatch)
  };
});

var PaginationWrapper = exports.PaginationWrapper = function (_Component) {
  _inherits(PaginationWrapper, _Component);

  function PaginationWrapper() {
    _classCallCheck(this, PaginationWrapper);

    return _possibleConstructorReturn(this, (PaginationWrapper.__proto__ || Object.getPrototypeOf(PaginationWrapper)).apply(this, arguments));
  }

  _createClass(PaginationWrapper, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          paginator = _props.paginator,
          pageActions = _props.pageActions;


      if (!paginator.get('initialized')) {
        pageActions.initialize();
      }

      this.reloadIfStale(this.props);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.reloadIfStale(nextProps);
    }
  }, {
    key: 'reloadIfStale',
    value: function reloadIfStale(props) {
      var paginator = props.paginator,
          pageActions = props.pageActions;

      if (paginator.get('stale') && !paginator.get('isLoading') && !paginator.get('loadError')) {
        pageActions.reload();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return this.props.children;
    }
  }]);

  return PaginationWrapper;
}(_react.Component);

PaginationWrapper.propTypes = {
  pageActions: _react.PropTypes.object.isRequired,
  paginator: _react.PropTypes.object,
  children: _react.PropTypes.element.isRequired
};
PaginationWrapper.defaultProps = {
  paginator: _reducer.defaultPaginator
};