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
    options: null,

    /**
     * Scroll the window to a given hash
     * @param {string}  hash  [The hash to scroll to, including # symbol]
     * @param {boolean} quick [If true, moves instantly - no smooth scroll]
     * @param {function} callback [Callback function]
     */
    scrollToHash: function (hash, options) {
      var offset = 0;
      var callback_ran = false;
      var target = jQuery(hash);

      options = jQuery.extend({
        quick: false,
        callback: null,
        extra_offset: 0,
        animate_options: {
          easing: 'swing',
          duration: 400,
        },
      }, options);

      if (!target.length) {
        return false;
      }

      if (this.options.offset_elem.length) {
        this.options.offset_elem.each(function () {
          offset -= (jQuery(this).height());
        });
      }

      var scroll_dist = target.offset().top;

      var final_scroll = Math.max(0, Math.max(0, scroll_dist + offset) - options.extra_offset);

      if (options.quick) {
        window.scroll(0, final_scroll);
        this.setHash(hash);

        if (options.callback) {
          options.callback();
        }
      } else {
        options.animate_options.complete = function () {
          this.setHash(hash);

          if (options.callback) {
            // Animating html and body causes the animate() callback
            // to be called twice. We'll use callback_ran to prevent
            // calling our own callback twice.
            if (!callback_ran) {
              options.callback();
              callback_ran = true;
            }
          }
        }.bind(this);
        
        jQuery('html, body').stop().animate(
          {scrollTop: final_scroll},
          options.animate_options
        );
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
     * @param {Object} options
     */
    init: function (options) {
      this.options = jQuery.extend({
        selector: '.smooth-scroll',
        offset_elem: null,
        extra_offset: 0,
        animate_options: {},
        callback: null,
      }, options);
      
      this.options.offset_elem = jQuery(this.options.offset_elem);
      
      jQuery(this.options.selector).on('click', function (e) {
        var hash = e.currentTarget.hash;

        if (!jQuery(hash).length) {
          return false;
        }

        e.preventDefault();

        var extra_offset = this.options.extra_offset;
        var data_offset = $(e.currentTarget).data('hashy-offset');
        
        if (data_offset) {
          if (String(data_offset).substr(0, 1) === '+' || String(data_offset).substr(0, 1) === '-') {
            extra_offset += parseInt(data_offset, 10);
          } else {
            extra_offset = data_offset;
          }
        }

        this.scrollToHash(hash, {
          quick: !!$(e.currentTarget).data('hashy-quick'),
          callback: this.options.callback,
          extra_offset: extra_offset,
          animate_options: this.options.animate_options,
        });
      }.bind(this));

      // Scroll to hash on page load. The browser does this by
      // default but this will compensate for sticky headers
      if (window.location.hash) {
        jQuery(window).on('load', function () {
          window.setTimeout(function() {
            this.scrollToHash(window.location.hash, jQuery.extend(this.options, {
              quick: true
            }));
          }.bind(this), 200);
        }.bind(this));
      }
    }
}));
