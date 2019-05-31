# hashy.js

Smooth scroll to internal anchors when clicking "hash" links (e.g. href="#foobar").

Offset scroll amount by the height of a given element including on page load - useful for sticky headers.

## Version 2

* No longer requires jQuery
* Dropped Bower support
* Updated API
* Removed UMD in favour of an ES2015 class
* extra_offset has been inverted

## Installation

```bash
npm install --save hashy-links
```

## Basic Usage

#### Html

```html
<nav id="fixedHeader">This is my fix position nav bar</nav>
<a href="#foo" class="smooth-scrolling-links">Click me</a>
```

#### JavaScript

```javascript
import Hashy from 'hashy-links';

const hashy = new Hashy('.smooth-scroll-links', '#fixedHeader', 20);

window.addEventListener('load', () => {
  hashy.scrollToLocationHash();
});
```

Marvelous.


## Parameters

```javascript
const hashy = new Hashy(link_selector, offset_selector, extra_offset);
```

**link_selector**

This is a jQuery selector for links that you want to smooth scroll when clicked. So if you have something like this:

When something with this selector is clicked hashy will look on the current page for an element with the given ID. If this element is not found, the default link's action will be used. This should allow external (not same page) links to be selected without causing problems except...

> **Potential Issue** - If you are on `foo.html` and have a link to `bar.html#baz` but `#baz` also exists on the current page then your link will effectively be broken. This is an issue that needs to be fixed. You can avoid this problem by being careful which links to pick with your selector. For example, **you probably don't want to do `hashy('a')`**.

**offset_selector**

This optional selector is for use with fixed menus that normally cover content when using hash links. For single menus an id selector is recommended, e.g. `hashy('#main-menu')`. If you have multiple menus you can pass in a selector that matches multiple items. The scroll will then be offset by the *combined height* of these elements.

**extra_offset**

An optional number of pixels to offset the scroll by, in addition the distance calculated by `offset_selector`. Can be positive or negative. You could even make it really, *really* negative and it will just stop at the top of the page. I've got you covered, bud.


## Advanced Usage

There are also a couple of helper methods you can use if you like.


### scrollToHash

```javascript
hashy.scrollToHash(hash, quick, callback, extra_offset)
```

Smooth scroll to the given hash and update the address bar.


#### Parameters

**hash** - The selector to scroll to. e.g. `#somewhere`

**quick** - (optional. Default: false) Don't transition - just go there!

**callback** - (optional) Function to call after scrolling has finished.

**extra_offset** - (optional) An additional pixel value to offset the scroll by


### setHash

```javacript
hashy.setHash(#whatever);
```

Update the address bar without scrolling the page.


## Dynamically Sized Content

If your content resizes when the page loads, you're going to want to call hashy after that is done, otherwise the offset calculations may be incorrect. Something like this might help:

```javascript
window.addEventListener('load', () => {
  Hashy.init('.smooth-scrolling-links', '#fixed-header');
});
```
