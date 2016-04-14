# hashy.js #

Smooth scroll to internal anchors when clicking "hash" links (e.g. href="#foobar").

Offset scroll amount by the height of a given element including on page load - useful for sticky headers.

Relies on jQuery because I haven't made it not. Pull requests are accepted.


## Installation ##

    bower install --save hashy

    # or

    npm install --save hashy-links


## Basic Usage ##

**Notice that things work slightly different with Hashy v1.0.0+. Hashy is now an object, not a function.**

    <a href="#foo" class="smooth-scrolling-links">Click me</a>

    <script src="hashy.js"></script>
    <script>
        $(window).load(function() {
            Hashy.init('.smooth-scrolling-links', '#fixed-header');
        });
    </script>

Marvelous.



## Parameters ##

    Hashy.init(link_selector, offset_selector);


**link_selector**

This is a jQuery selector for links that you want to smooth scroll when clicked. So if you have something like this:

When something with this selector is clicked hashy will look on the current page for an element with the given ID. If this element is not found, the default link's action will be used. This should allow external (not same page) links to be selected without causing problems except...

> **Potential Issue** - If you are on `foo.html` and have a link to `bar.html#baz` but `#baz` also exists on the current page then your link will effectively be broken. This is an issue that needs to be fixed. You can avoid this problem by being careful which links to pick with your selector. For example, you probably don't want to do `hashy('a')`.

**offset_selector**

This optional selector is for use with fixed menus that normally cover content when using hash links. For single menus an id selector is recommended, e.g. `hashy('#main-menu')`. If you have multiple menus you can pass in a selector that matches multiple items. The scroll will then be offset by the *combined height* of these elements.



## Advanced Usage ##

There are also a couple of helper methods you can use if you like.

### scrollToHash ###

    Hashy.scrollToHash(hash, quick, callback)

Smooth scroll to the given hash and update the address bar.

#### Parameters ####

**hash** - The selector to scroll to. e.g. `#somewhere`

**quick** - (optional. Default: false) Don't transition - just go there!

**callback** - (optional) Function to call after scrolling has finished.


### setHash ###

    Hashy.setHash(#whatever);

Update the address bar - *don't* scroll.



## Dynamically Sized Content ##

If your content resizes when the page loads, you're going to want to call hashy after that is done, otherwise the offset calculations may be incorrect. Something like this might help:

    $(window).load(function() {
        Hashy.init('.smooth-scrolling-links', #fixed-header');
    });
