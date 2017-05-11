'use strict';

exports.__esModule = true;
exports['default'] = setScrollRestoration;

function setScrollRestoration(scrollRestoration) {
  /* istanbul ignore if: not supported by any browsers on Travis */
  if ('scrollRestoration' in window.history) {
    var _ret = (function () {
      var oldScrollRestoration = window.history.scrollRestoration;
      window.history.scrollRestoration = scrollRestoration;

      return {
        v: function () {
          window.history.scrollRestoration = oldScrollRestoration;
        }
      };
    })();

    if (typeof _ret === 'object') return _ret.v;
  }

  return null;
}

module.exports = exports['default'];