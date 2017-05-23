'use strict';
var hasClass = require('./hasClass');

module.exports = function(element, className) {
  if (hasClass(className)) {
    if (element.classList) {
      element.classList.remove(className);
    } else {
      element.className = (' ' + element.className + ' ')
        .replace(' ' + className + ' ', ' ').trim();
    }
  }
  return element;
}
