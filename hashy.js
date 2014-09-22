
/**
 * Smooth scroll to hash links.
 * Scroll to hash links on load.
 * Offset by height of fixed menu.
 * @param {String} offset [Selector for nav element]
 */
var hashy = function(offset_sel) {

  var offset_elem = $(offset_sel);

  function scrollToHash(hash) {
    $target = $(hash);

    $('html, body').stop().animate({
      'scrollTop': $target.offset().top - offset_elem.height()
    }, 400, 'swing', function () {
      window.location.hash = hash;
    });
  }

  // Smooth scroll hash links
  $('a[href^="#"]').on('click', function (e) {
    e.preventDefault();
    scrollToHash(this.hash);
  });

  if (window.location.hash) {
    scrollToHash(window.location.hash);
  }

};
