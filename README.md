# hashy.js #

 > Important Note: Version 2 drastically changes the API. I'm now using options objects instead of separate parameters.

Smooth scroll to internal anchors when clicking "hash" links (e.g. href="#foobar").

Offset scroll amount by the height of a given element including on page load - useful for sticky headers.

Relies on jQuery because I haven't made it not. Pull requests are accepted.

# Installation #

    bower install --save hashy

or

    npm install --save hashy-links


# Basic Usage #

index.html

    <a href="#foo" class="smooth-scrolling-links">Click me</a>

main.js

    import Hashy from 'hashy-links';

    Hashy.init({
        selector: '.smooth-scrolling-links',
        offset_elem: '#fixed-header'
    });

You can also use data attributes on links.

    <a href="#foo" data-hashy-offset="100">Click me</a>

Marvelous.


### Parameters ###

    Hashy.init({
        selector: '.my-smooth-scrolling-links'
    });

Hashy takes one parameter, an options object that can have the following options:

##### selector #####

This is a jQuery selector for links that you want to smooth scroll when clicked. So if you have something like this:

When something with this selector is clicked hashy will look on the current page for an element with the given ID. If this element is not found, the default link's action will be used. This should allow external (not same page) links to be selected without causing problems except...

> **Potential Issue** - If you are on `foo.html` and have a link to `bar.html#baz` but `#baz` also exists on the current page then your link will effectively be broken. This is an issue that needs to be fixed. You can avoid this problem by being careful which links to pick with your selector. For example, **you probably don't want to do `hashy('a')`**.

##### offset_elem #####

This optional selector is for use with fixed menus that normally cover content when using hash links. For single menus an id selector is recommended, e.g. `hashy('#main-menu')`. If you have multiple menus you can pass in a selector that matches multiple items. The scroll will then be offset by the *combined height* of these elements.

##### extra_offset #####

An optional number of pixels to offset the scroll by, in addition the distance calculated by `offset_elem`. Can be positive or negative. Positive values will scroll the window *up*. You could even make it really, *really* positive and it will just stop at the top of the page. I've got you covered, bud.


# Advanced Usage #

There are also a couple of helper methods you can use if you like.


### scrollToHash ###

    Hashy.scrollToHash(hash, options);

Smooth scroll to the given hash and update the address bar.


##### Parameters #####

* **hash** - The selector to scroll to. e.g. `'#somewhere'`
* **Options** - An object that can contain the following:
  * **quick** - (optional. Default: false) Don't transition - just go there!
  * **callback** - (optional) Function to call after scrolling has finished.
  * **extra_offset** - (optional) An pixel value that will be added to the height of `offset_elem`. A negative amount will scroll the window *down*


### setHash ###

    Hashy.setHash('#whatever');

Update the address bar - *don't* scroll.


### Data Attributes ###

Use can override parameters on specific links using the following data attributes.

* **data-hashy-offset** - Add or subtract from the normal offset by using e.g. `-50` or `+50`. Or set an absolute value e.g. `50`.
* **data-hashy-quick** - Set to `true` to move directly rather than transitioning smoothly. Not sure why you'd want to use this but it's there if you want it.


# Dynamically Sized Content #

If your content resizes when the page loads, you're going to want to call hashy after that is done, otherwise the offset calculations may be incorrect. Something like this might help:

    $(window).load(function() {
        Hashy.init('.smooth-scrolling-links', #fixed-header');
    });


# Development #

I haven't made any automated tests yet.

Run `npm run dev` to compile to ES5 and create `bundle.js`. Then load `test/index.html` in a browser.
