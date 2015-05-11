
/**
 * Smooth scroll to hash links.
 * Scroll to hash links on load.
 * Offset by height of fixed menu.
 */
var Hashy = {

  offset_elem: null,
  scroll_time: 400,

  /**
   * Scroll the window to a given hash
   * @param {string}  hash  [The hash to scroll to, including # symbol]
   * @param {boolean} quick [If true, moves instantly - no smooth scroll]
   * @param {function} callback [Callback function]
   */
  scrollToHash: function (hash, quick, callback) {
    var offset_height = 0;

    if (!this.offset_elem.length) {
      offset_height = 0;
    } else {
      this.offset_elem.each(function () {
        offset_height += jQuery(this).height();
      });
    }

    $target = jQuery(hash);

    if ($target.length) {
      scroll_dist = $target.offset().top - offset_height;

      if (quick) {
        window.scroll(0, scroll_dist);
        Hashy.setHash(hash);
        
        if (callback) {
          callback();
        }
      } else {
        jQuery('html, body').stop().animate({
          'scrollTop': scroll_dist
        }, this.scroll_time, 'swing', function () {
          Hashy.setHash(hash);

          if (callback) {
            callback();
          }
        });
      }
    }
  },

  /**
   * Set the hash part of the URL without scrolling the window
   * @param {string} hash [New hash to set, including # symbol]
   */
  setHash: function (hash) {
    if (history.pushState) {
      history.pushState(null, null, hash);
    } else {
      location.hash = hash;
    }
  },

  /**
   * Initialise Hashy
   * @param {String} link_sel   [Selector for hash link elements]
   * @param {String} offset_sel [Selector for offset element]
   */
  init: function (link_sel, offset_sel) {
    this.offset_elem = jQuery(offset_sel);

    // Smooth scroll hash links
    jQuery(link_sel).on('click', function (e) {
      if (jQuery(this.hash).length) {
        e.preventDefault();
        Hashy.scrollToHash(this.hash, false);
      }
    });

    // Scroll to hash on page load. The browser does this by 
    // default but this will compensate for sticky headers
    if (window.location.hash) {
      jQuery(window).load(function () {
        window.setTimeout(function() {
          Hashy.scrollToHash(window.location.hash, true);
        }, 200);
      });
    }
  }
};
