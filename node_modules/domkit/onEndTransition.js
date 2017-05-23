'use strict';

var getVendorPropertyName = require('./getVendorPropertyName');
// http://stackoverflow.com/questions/16439161/how-to-support-transitionend-without-browser-sniffing
var transEndEventNames = {
  'WebkitTransition': 'webkitTransitionEnd',
  'MozTransition': 'transitionend',
  'OTransition': 'oTransitionEnd',
  'msTransition': 'MSTransitionEnd',
  'transition': 'transitionend'
};

var transEventName = getVendorPropertyName('transition', true);
var transEndEventName = transEndEventNames[transEventName];
var supportTransitions = !!transEventName;

module.exports = function(el, callback) {
  var onEndCallbackFn = function( ev ) {
    if( supportTransitions ) {
      if( ev.target != this ) return;
      this.removeEventListener( transEndEventName, onEndCallbackFn );
    }
    if( callback && typeof callback === 'function' ) { callback.call(this); }
  };
  if( supportTransitions ) {
    el.addEventListener( transEndEventName, onEndCallbackFn );
  }
  else {
    onEndCallbackFn();
  }
}
