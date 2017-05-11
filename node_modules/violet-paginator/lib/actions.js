'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.destroyAll = destroyAll;
exports.expireAll = expireAll;
exports.default = register;
exports.composables = composables;

var _actionTypes = require('./actionTypes');

var actionTypes = _interopRequireWildcard(_actionTypes);

var _simpleComposables = require('./actions/simpleComposables');

var _simpleComposables2 = _interopRequireDefault(_simpleComposables);

var _fetchingComposables = require('./actions/fetchingComposables');

var _fetchingComposables2 = _interopRequireDefault(_fetchingComposables);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function destroyAll() {
  return {
    type: actionTypes.DESTROY_ALL
  };
}

function expireAll() {
  return {
    type: actionTypes.EXPIRE_ALL
  };
}

function register(config) {
  return _extends({}, (0, _fetchingComposables2.default)(config), (0, _simpleComposables2.default)(config.listId));
}

function composables(config) {
  return register(_extends({}, config, {
    isBoundToDispatch: false
  }));
}