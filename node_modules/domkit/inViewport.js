/*!
 * verge 1.9.1+201402130803
 * https://github.com/ryanve/verge
 * MIT License 2013 Ryan Van Etten
 */
'use strict';

var win = typeof window != 'undefined' && window;
var doc = typeof document != 'undefined' && document;
var docElem = doc && doc.documentElement;

function viewportW() {
  var a = docElem['clientWidth'], b = win['innerWidth'];
  return a < b ? b : a;
}

function viewportH() {
  var a = docElem['clientHeight'], b = win['innerHeight'];
  return a < b ? b : a;
}

/**
 * @param {{top:number, right:number, bottom:number, left:number}} coords
 * @param {number=} cushion adjustment
 * @return {Object}
 */
function calibrate(coords, cushion) {
  var o = {};
  cushion = +cushion || 0;
  o['width'] = (o['right'] = coords['right'] + cushion) - (o['left'] = coords['left'] - cushion);
  o['height'] = (o['bottom'] = coords['bottom'] + cushion) - (o['top'] = coords['top'] - cushion);
  return o;
}

/**
 * Cross-browser element.getBoundingClientRect plus optional cushion.
 * Coords are relative to the top-left corner of the viewport.
 * @since 1.0.0
 * @param {Element|Object} el element or stack (uses first item)
 * @param {number=} cushion +/- pixel adjustment amount
 * @return {Object|boolean}
 */
function rectangle(el, cushion) {
  el = el && !el.nodeType ? el[0] : el;
  if (!el || 1 !== el.nodeType) return false;
  return calibrate(el.getBoundingClientRect(), cushion);
}

module.exports = function (el, cushion) {
  // Equiv to `inX(el, cushion) && inY(el, cushion)` but just manually do both
  // to avoid calling rectangle() twice. It gzips just as small like this.
  var r = rectangle(el, cushion);
  return !!r && r.bottom >= 0 && r.right >= 0 && r.top <= viewportH() && r.left <= viewportW();
}
