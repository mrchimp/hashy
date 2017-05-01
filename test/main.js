"use strict";

import Hashy from '../hashy.js';

/**
 * Initialise hashy.
 * 
 * This enables smooth scrolling on hash links and will scroll to a hash
 * on load, if appropriate.
 */
Hashy.init({
  selector: '.smooth-scroll', // Make these links mooth scroll
  offset_elem: 'nav',         // Offset scroll by the height of these elements
  extra_offset: 50,          // Compensate for section padding
  callback: function () {
    console.log('Complete!');
  },
});


// Scroll to a given hash and update the address bar
$('.scroll-to-top').on('click', function (e) {
  e.preventDefault();
  Hashy.scrollToHash('#top', {
    quick: false,
  });
});


// Scroll to 100px below the top of the page
$('.offset-test').on('click', function (e) {
  e.preventDefault();
  Hashy.scrollToHash('#top', {
    quick: false,
    extra_offset: -100,
  });
});


// Try to scroll above the top of the page - actually just scroll to top
$('.offset-test-too-far').on('click', function (e) {
  e.preventDefault();
  Hashy.scrollToHash('#top', {
    quick: false,
    extra_offset: 100,
  });
});


// Just set the hash in the address bar but don't scroll the page
$('.set-a-hash').on('click', function (e) {
  e.preventDefault();
  Hashy.setHash('#some-random-hash');
});
