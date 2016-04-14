/**
* Smooth scroll to hash links.
* Scroll to hash links on load.
* Offset by height of fixed menu.
*/
(function (root, Hashy) {
  if ( typeof define === 'function' && define.amd ) {
    define(Hashy);
  } else if ( typeof exports === 'object' ) {
    module.exports = Hashy;
  } else {
    root.Hashy = Hashy;
  }
}(this, {
    offset_elem: null,
    scroll_time: 400,

    /**
     * Scroll the window to a given hash
     * @param {string}  hash  [The hash to scroll to, including # symbol]
     * @param {boolean} quick [If true, moves instantly - no smooth scroll]
     * @param {function} callback [Callback function]
     */
    scrollToHash: function (hash, quick, callback, extra_offset) {
      var offset_height = 0,
          callback_ran = false;

      extra_offset = typeof extra_offset !== 'undefined' ? extra_offset : 0;

      if (this.offset_elem.length) {
        this.offset_elem.each(function () {
          offset_height += (jQuery(this).height() - extra_offset);
        });
      }

      var $target = jQuery(hash);

      if ($target.length) {
        var scroll_dist = Math.max(0, $target.offset().top - offset_height);

        if (quick) {
          window.scroll(0, scroll_dist);
          this.setHash(hash);

          if (callback) {
            callback();
          }
        } else {
          // Animating html and body causes the animate() callback
          // to be called twice. We'll use callback_ran to prevent
          // calling our own callback twice.
          jQuery('html, body').stop().animate({
            'scrollTop': scroll_dist
          }, this.scroll_time, 'swing', function () {
            this.setHash(hash);

            if (callback) {
              if (!callback_ran) {
                callback();
                callback_ran = true;
              }
            }
          }.bind(this));
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
     * @param {Integer} extra_offset [Value for additional offset]
     */
    init: function (link_sel, offset_sel, extra_offset) {
      this.offset_elem = jQuery(offset_sel);

      // Smooth scroll hash links when clicked
      jQuery(link_sel).on('click', function (e) {
        var hash = e.currentTarget.hash;
        if (jQuery(hash).length) {
          e.preventDefault();
          this.scrollToHash(hash, false, false, extra_offset);
        }
      }.bind(this));

      // Scroll to hash on page load. The browser does this by
      // default but this will compensate for sticky headers
      if (window.location.hash) {
        jQuery(window).load(function () {
          window.setTimeout(function() {
            this.scrollToHash(window.location.hash, true);
          }.bind(this), 200);
        }.bind(this));
      }
    }
}));
