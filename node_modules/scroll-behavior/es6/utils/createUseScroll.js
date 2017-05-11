"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

export default createUseScroll;

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function defaultShouldUpdateScroll() {
  return true;
}
function createUseScroll(updateScroll, start, stop) {
  return function (createHistory) {
    return function () {
      var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
      var _options$shouldUpdateScroll = options.shouldUpdateScroll;
      var shouldUpdateScroll = _options$shouldUpdateScroll === undefined ? defaultShouldUpdateScroll : _options$shouldUpdateScroll;

      var historyOptions = _objectWithoutProperties(options, ["shouldUpdateScroll"]);

      var history = createHistory(historyOptions);

      var numListeners = 0;

      function checkStart() {
        if (++numListeners === 1 && start) {
          start(history);
        }
      }

      function checkStop() {
        if (--numListeners === 0 && stop) {
          stop();
        }
      }

      function listenBefore(hook) {
        checkStart();
        var unlisten = history.listenBefore(hook);

        return function () {
          unlisten();
          checkStop();
        };
      }

      var oldLocation = undefined;
      var listeners = [],
          currentLocation = undefined,
          unlisten = undefined;

      function onChange(location) {
        oldLocation = currentLocation;
        currentLocation = location;

        listeners.forEach(function (listener) {
          return listener(location);
        });
        if (shouldUpdateScroll(oldLocation, currentLocation)) {
          updateScroll(location);
        }
      }

      function listen(listener) {
        checkStart();

        if (listeners.length === 0) {
          unlisten = history.listen(onChange);
        }

        // Add the listener to the list afterward so we can manage calling it
        // initially with the current location.
        listeners.push(listener);
        listener(currentLocation);

        return function () {
          listeners = listeners.filter(function (item) {
            return item !== listener;
          });
          if (listeners.length === 0) {
            unlisten();
          }

          checkStop();
        };
      }

      return _extends({}, history, {
        listenBefore: listenBefore,
        listen: listen
      });
    };
  };
}