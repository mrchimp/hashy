
/**
 * Smooth scroll to hash links.
 * Scroll to hash links on load.
 * Offset by height of fixed menu.
 * @param {String} offset [Selector for nav element]
 */
var hashy = function(link_sel, offset_sel) {

  var offset_elem = $(offset_sel);

  function scrollToHash(hash) {
    var offset_height = 0;

    offset_elem.each(function () {
      offset_height += $(this).height();
    });

    $target = $(hash);

    if ($target.length) {
      $('html, body').stop().animate({
        'scrollTop': $target.offset().top - offset_height
      }, 400, 'swing', function () {
        window.location.hash = hash;
      });
    }
  }

  // Smooth scroll hash links
  $(link_sel).on('click', function (e) {
    if ($(this.hash).length) {
      e.preventDefault();
      scrollToHash(this.hash);
    }
  });

  if (window.location.hash) {
    $(window).load(function () {
      window.setTimeout(function() {
        scrollToHash(window.location.hash);
      }, 200);
    });
  }
};
