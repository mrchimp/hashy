
/**
 * Smooth scroll to hash links.
 * Scroll to hash links on load.
 * Offset by height of fixed menu.
 * @param {String} offset [Selector for nav element]
 */
var hashy = function(link_sel, offset_sel) {

  var offset_elem = $(offset_sel);

  /**
   * Scroll the window to a given hash
   * @param  {string}  hash  [The hash to scroll to, NOT including # symbol]
   * @param  {boolean} quick [If true, moves instantly - no smooth scroll]
   */
  function scrollToHash(hash, quick) {
    var offset_height = 0;

    if (!offset_elem.length) {
      offset_elem.each(function () {
        offset_height += $(this).height();
      });
    } else {
      offset_height = 0;
    }

    $target = $(hash);

    if ($target.length) {
      scroll_dist = $target.offset().top - offset_height;

      if (quick) {
        window.scroll(0, scroll_dist);
        setHash(hash);
      } else {
        $('html, body').stop().animate({
          'scrollTop': scroll_dist
        }, 400, 'swing', function () {
          setHash(hash);
        });
      }
    }
  }

  /**
   * Set the hash part of the URL without scrolling the window
   * @param {string} hash [New hash to set, NOT including # symbol]
   */
  function setHash (hash) {
    if (history.pushState) {
      history.pushState(null, null, '#' + hash);
    } else {
      location.hash = hash;
    }
  }

  // Smooth scroll hash links
  $(link_sel).on('click', function (e) {
    if ($(this.hash).length) {
      e.preventDefault();
      scrollToHash(this.hash, false);
    }
  });

  // Scroll to hash on page load. The browser does this by 
  // default but this will compensate for sticky headers
  if (window.location.hash) {
    $(window).load(function () {
      window.setTimeout(function() {
        scrollToHash(window.location.hash, true);
      }, 200);
    });
  }
};
