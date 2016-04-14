"use strict";

// This file is just for testing. When you run `node make.js` it will create
// bundle.js which will contain this file and hashy.js

import Hashy from '../hashy.js';

// Initialise hashy.
// This enables smooth scrolling on hash links and will scroll to a hash
// on load, if appropriate.
Hashy.init('.smooth-scroll', 'nav');


// Scroll to a given hash and update the address bar
$('.scroll-to-test').on('click', function (e) {
  e.preventDefault();
  Hashy.scrollToHash('#top', false, function () {
    console.log('Finished scrolling.');
  });
});


// Scroll to 10px below the top of the page
$('.offset-test').on('click', function (e) {
  e.preventDefault();
  Hashy.scrollToHash('#top', false, function () {
    console.log('Finished scrolling.');
  }, 10);
});


// Try to scroll above the top of the page - actually just scroll to top
$('.offset-test-too-far').on('click', function (e) {
  e.preventDefault();
  Hashy.scrollToHash('#top', false, function () {
    console.log('Finished scrolling.');
  }, -100);
});


// Just set the hash in the address bar.
// Doesn't scroll the page.
$('.set-a-hash').on('click', function (e) {
  e.preventDefault();
  Hashy.setHash('#some-random-hash');
});
