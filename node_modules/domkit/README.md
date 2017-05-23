# DOM Kit
> Toolkit for DOM

```
npm install domkit --save
```

## insertKeyframesRule

```js
var insertKeyframesRule = require('domkit/insertKeyframesRule');
var keyframes = {
  '0%': {
    transform: 'scale(1)'
  },
  '50%': {
    transform: 'scale(0.5)',
    opacity: 0.7
  },
  '100%': {
    transform: 'scale(1)',
    opacity: 1
  }
};

var animationName = insertKeyframesRule(keyframes);
```

## insertRule

```js
var insertRule = require('domkit/insertRule');
var css = '.foo {}'
insertRule(css);
```

## appendVendorPrefix

```js
var appendVendorPrefix = require('domkit/appendVendorPrefix');
var style = {
  transform: 'scaleX(1)'
}
appendVendorPrefix(style);
```

## getVendorPrefix

```js
var getVendorPrefix = require('domkit/getVendorPrefix');
var vendorPrefix = getVendorPrefix(); // => -webkit-
```

## addClass

```js
var addClass = require('domkit/addClass');
addClass(this.getDOMNode(), 'foo');
```

## removeClass

```js
var removeClass = require('domkit/removeClass');
removeClass(this.getDOMNode(), 'foo');
```

## hasClass

```js
var hasClass = require('domkit/hasClass');
hasClass(this.getDOMNode(), 'foo'); // => true
```

## transitionEventsa

```js
var transitionEvents = require('domkit/transitionEvents');
transitionEvents.addEndEventListener(node, eventListener);
transitionEvents.removeEndEventListener(node, eventListener);
```

## classNames

```js
var classNames = require('domkit/classNames');

classNames('foo', 'bar'); // => 'foo bar'
classNames('foo', { bar: true }); // => 'foo bar'
classNames({ foo: true }, { bar: true }); // => 'foo bar'
classNames({ foo: true, bar: true }); // => 'foo bar'

// lots of arguments of various types
classNames('foo', { bar: true, duck: false }, 'baz', { quux: true }) // => 'foo bar baz quux'

// other falsy values are just ignored
classNames(null, false, 'bar', undefined, 0, 1, { baz: null }, ''); // => 'bar 1'

// Arrays will be recursively flattened as per the rules above:
var arr = ['b', { c: true, d: false }];
classNames('a', arr); // => 'a b c'
```

## canUseDOM

```js
var canUseDOM = require('domkit/canUseDOM');
if(canUseDOM){
  // balabala
}
```

## addEventListener

```js
var addEventListener = require('domkit/addEventListener');
addEventListener(window, 'scroll', handle)
```

## removeEventListener
```js
var removeEventListener = require('domkit/removeEventListener');
removeEventListener(window, 'scroll', handle)
```

## throttle
```js
var throttle = require('domkit/throttle');
throttle(fn, 100)
```

## onEndTransition
```js
var onEndTransition = require('domkit/onEndTransition');
onEndTransition(el, handle)
```

## inViewport
```js
var inViewport = require('domkit/inViewport');
inViewport(el) // true if elem is in the current viewport
inViewport(el, 100) // true if elem is in the current viewport or within 100px of it
inViewport(el, -100) // true if elem is in the current viewport and not within 99px of the edge
```

## Browser Support

![IE](https://raw.github.com/alrra/browser-logos/master/internet-explorer/internet-explorer_48x48.png) | ![Chrome](https://raw.github.com/alrra/browser-logos/master/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/firefox/firefox_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/opera/opera_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/safari/safari_48x48.png)
--- | --- | --- | --- | --- |
IE 6+ ✔ | Chrome 4.0+ ✔ | Firefox 16.0+ ✔ | Opera 15.0+ ✔ | Safari 4.0+ ✔ |
