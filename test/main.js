'use strict';

// This file is just for testing. When you run `node make.js` it will create
// bundle.js which will contain this file and hashy.js

import Hashy from '../hashy.js';

// Initialise hashy.
// This enables smooth scrolling on hash links and will scroll to a hash
// on load, if appropriate.
const hashy = new Hashy('.smooth-scroll', 'nav', 10, 1000);

window.addEventListener('load', () => {
  hashy.scrollToLocationHash();
});

// Scroll to a given hash and update the address bar
document.getElementById('scrollToTest').addEventListener('click', function(e) {
  e.preventDefault();
  hashy.scrollToHash('#top', false, function() {
    console.log('Finished scrolling.');
  });
});

// Try to scroll above the top of the page - actually just scroll to top
document.getElementById('offsetTestTooFar').addEventListener('click', function(e) {
  e.preventDefault();
  hashy.scrollToHash(
    '#top',
    false,
    function() {
      console.log('Finished scrolling.');
    },
    1000
  );
});

// Just set the hash in the address bar.
// Doesn't scroll the page.
document.getElementById('setAHash').addEventListener('click', function(e) {
  e.preventDefault();
  hashy.setHash('#some-random-hash');
});
