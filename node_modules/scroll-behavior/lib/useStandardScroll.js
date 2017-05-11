'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports['default'] = useStandardScroll;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _domHelpersEventsOff = require('dom-helpers/events/off');

var _domHelpersEventsOff2 = _interopRequireDefault(_domHelpersEventsOff);

var _domHelpersEventsOn = require('dom-helpers/events/on');

var _domHelpersEventsOn2 = _interopRequireDefault(_domHelpersEventsOn);

var _domHelpersQueryScrollLeft = require('dom-helpers/query/scrollLeft');

var _domHelpersQueryScrollLeft2 = _interopRequireDefault(_domHelpersQueryScrollLeft);

var _domHelpersQueryScrollTop = require('dom-helpers/query/scrollTop');

var _domHelpersQueryScrollTop2 = _interopRequireDefault(_domHelpersQueryScrollTop);

var _domHelpersUtilRequestAnimationFrame = require('dom-helpers/util/requestAnimationFrame');

var _domHelpersUtilRequestAnimationFrame2 = _interopRequireDefault(_domHelpersUtilRequestAnimationFrame);

var _historyLibDOMStateStorage = require('history/lib/DOMStateStorage');

var _utilsCreateUseScroll = require('./utils/createUseScroll');

var _utilsCreateUseScroll2 = _interopRequireDefault(_utilsCreateUseScroll);

var _utilsSetScrollRestoration = require('./utils/setScrollRestoration');

var _utilsSetScrollRestoration2 = _interopRequireDefault(_utilsSetScrollRestoration);

/**
 * `useStandardScroll` attempts to imitate native browser scroll behavior by
 * recording updates to the window scroll position, then restoring the previous
 * scroll position upon a `POP` transition.
 */

function useStandardScroll(createHistory) {
  var currentKey = undefined;

  function getScrollPosition() {
    var state = _historyLibDOMStateStorage.readState(currentKey);
    if (!state) {
      return null;
    }

    return state.scrollPosition;
  }

  // `history` will invoke this listener synchronously, so `currentKey` will
  // always be defined.
  function updateScroll(_ref) {
    var key = _ref.key;

    currentKey = key;

    var scrollPosition = getScrollPosition() || [0, 0];
    window.scrollTo.apply(window, scrollPosition);
  }

  var unsetScrollRestoration = undefined,
      unlistenScroll = undefined,
      unlistenBefore = undefined;

  function start(history) {
    // This helps avoid some jankiness in fighting against the browser's
    // default scroll behavior on `POP` transitions.
    unsetScrollRestoration = _utilsSetScrollRestoration2['default']('manual');

    var savePositionHandle = null;

    // We have to listen to each scroll update rather than to just location
    // updates, because some browsers will update scroll position before
    // emitting the location change.
    function onScroll() {
      if (savePositionHandle !== null) {
        return;
      }

      // It's possible that this scroll operation was triggered by what will be
      // a `POP` transition. Instead of updating the saved location
      // immediately, we have to enqueue the update, then potentially cancel it
      // if we observe a location update.
      savePositionHandle = _domHelpersUtilRequestAnimationFrame2['default'](function () {
        savePositionHandle = null;

        var state = _historyLibDOMStateStorage.readState(currentKey);
        var scrollPosition = [_domHelpersQueryScrollLeft2['default'](window), _domHelpersQueryScrollTop2['default'](window)];

        // We have to directly update `DOMStateStorage`, because actually
        // updating the location could cause e.g. React Router to re-render the
        // entire page, which would lead to observably bad scroll performance.
        _historyLibDOMStateStorage.saveState(currentKey, _extends({}, state, { scrollPosition: scrollPosition }));
      });
    }

    _domHelpersEventsOn2['default'](window, 'scroll', onScroll);
    unlistenScroll = function () {
      return _domHelpersEventsOff2['default'](window, 'scroll', onScroll);
    };

    unlistenBefore = history.listenBefore(function () {
      if (savePositionHandle !== null) {
        _domHelpersUtilRequestAnimationFrame2['default'].cancel(savePositionHandle);
        savePositionHandle = null;
      }
    });
  }

  function stop() {
    /* istanbul ignore if: not supported by any browsers on Travis */
    if (unsetScrollRestoration) {
      unsetScrollRestoration();
    }

    unlistenScroll();
    unlistenBefore();
  }

  return _utilsCreateUseScroll2['default'](updateScroll, start, stop)(createHistory);
}

module.exports = exports['default'];