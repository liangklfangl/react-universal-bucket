'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = range;

require('babel-regenerator-runtime');

var _marked = [range].map(regeneratorRuntime.mark);

function range(low, high) {
  var i;
  return regeneratorRuntime.wrap(function range$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          i = low;

        case 1:
          if (!(i <= high)) {
            _context.next = 7;
            break;
          }

          _context.next = 4;
          return i;

        case 4:
          i++;
          _context.next = 1;
          break;

        case 7:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked[0], this);
}