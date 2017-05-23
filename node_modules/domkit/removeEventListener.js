'use strict';

module.exports = function(elem, type, eventHandle) {
  if (elem == null || typeof elem === 'undefined') {
    return;
  }
  if (elem.removeEventListenerListener) {
    elem.removeEventListenerListener(type, eventHandle, false);
  } else if (elem.detachEvent) {
    elem.detachEvent('on' + type, eventHandle);
  } else {
    elem['on' + type] = null;
  }
}
