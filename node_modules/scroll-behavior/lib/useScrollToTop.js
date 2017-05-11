'use strict';

exports.__esModule = true;
exports['default'] = useScrollToTop;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _historyLibActions = require('history/lib/Actions');

var _utilsCreateUseScroll = require('./utils/createUseScroll');

var _utilsCreateUseScroll2 = _interopRequireDefault(_utilsCreateUseScroll);

var _utilsSetScrollRestoration = require('./utils/setScrollRestoration');

var _utilsSetScrollRestoration2 = _interopRequireDefault(_utilsSetScrollRestoration);

/**
 * `useScrollToTop` scrolls to the top of the page after any transition.
 *
 * This is not fully reliable for `POP` transitions.
 */

function useScrollToTop(createHistory) {
  var unsetScrollRestoration = undefined;

  function updateScroll(_ref) {
    var action = _ref.action;

    // If we didn't manage to disable the default scroll restoration, and it's
    // a pop transition for which the browser might restore scroll position,
    // then let the browser update to its remembered scroll position first,
    // before we set the actual correct scroll position.
    if (action === _historyLibActions.POP && !unsetScrollRestoration) {
      setTimeout(function () {
        return window.scrollTo(0, 0);
      });
      return;
    }

    window.scrollTo(0, 0);
  }

  function start() {
    // This helps avoid some jankiness in fighting against the browser's
    // default scroll behavior on `POP` transitions.
    unsetScrollRestoration = _utilsSetScrollRestoration2['default']('manual');
  }

  function stop() {
    /* istanbul ignore if: not supported by any browsers on Travis */
    if (unsetScrollRestoration) {
      unsetScrollRestoration();
    }
  }

  return _utilsCreateUseScroll2['default'](updateScroll, start, stop)(createHistory);
}

module.exports = exports['default'];