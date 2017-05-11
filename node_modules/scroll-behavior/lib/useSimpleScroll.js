'use strict';

exports.__esModule = true;
exports['default'] = useSimpleScroll;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _historyLibActions = require('history/lib/Actions');

var _utilsCreateUseScroll = require('./utils/createUseScroll');

var _utilsCreateUseScroll2 = _interopRequireDefault(_utilsCreateUseScroll);

/**
 * `useSimpleScroll` scrolls to the top of the page on `PUSH` and `REPLACE`
 * transitions, while allowing the browser to manage scroll position for `POP`
 * transitions.
 *
 * This can give pretty good results with synchronous transitions on browsers
 * like Chrome that don't update the scroll position until after they've
 * notified `history` of the location change. It will not work as well when
 * using asynchronous transitions or with browsers like Firefox that update
 * the scroll position before emitting the location change.
 */

function useSimpleScroll(createHistory) {
  // Don't override the browser's scroll behavior here - we actively want the
  // the browser to take care of scrolling on `POP` transitions.

  function updateScroll(_ref) {
    var action = _ref.action;

    if (action === _historyLibActions.POP) {
      return;
    }

    window.scrollTo(0, 0);
  }

  return _utilsCreateUseScroll2['default'](updateScroll)(createHistory);
}

module.exports = exports['default'];