'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _redux = require('redux');

var wrapMapDispatchToProps = function wrapMapDispatchToProps(mapDispatchToProps, actionCreators) {
  if (mapDispatchToProps) {
    if (typeof mapDispatchToProps === 'function') {
      if (mapDispatchToProps.length > 1) {
        return function (dispatch, ownProps) {
          return _extends({}, mapDispatchToProps(dispatch, ownProps), _redux.bindActionCreators(actionCreators, dispatch), {
            dispatch: dispatch
          });
        };
      }
      return function (dispatch) {
        return _extends({}, mapDispatchToProps(dispatch), _redux.bindActionCreators(actionCreators, dispatch), {
          dispatch: dispatch
        });
      };
    }
    return function (dispatch) {
      return _extends({}, _redux.bindActionCreators(mapDispatchToProps, dispatch), _redux.bindActionCreators(actionCreators, dispatch), {
        dispatch: dispatch
      });
    };
  }
  return function (dispatch) {
    return _extends({}, _redux.bindActionCreators(actionCreators, dispatch), {
      dispatch: dispatch
    });
  };
};

exports['default'] = wrapMapDispatchToProps;
module.exports = exports['default'];