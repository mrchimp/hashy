/**
 * Smooth scroll to hash links andoffset by height of fixed navbar.
 */
export default class Hashy {
  /**
   * @param {string}  link_sel     [Selector for hash link elements]
   * @param {string}  offset_sel   [Selector for offset elements]
   * @param {integer} extra_offset [Value for additional offset]
   */
  constructor(link_sel, offset_sel, extra_offset, scroll_time) {
    this.scroll_time = scroll_time || 200;
    this.offset_elems = document.querySelectorAll(offset_sel);
    this.extra_offset = typeof extra_offset === 'number' ? extra_offset : 0;

    const links = document.querySelectorAll(link_sel);

    for (let i = 0; i < links.length; i++) {
      const link = links[i];

      link.addEventListener('click', (e) => {
        var hash = e.currentTarget.hash;
        const elem = this.getElementFromHash(hash);

        if (elem) {
          e.preventDefault();
          this.scrollToHash(hash, false, false, extra_offset);
        }
      });
    }
  }

  /**
   * Find an element by its ID from a hash. Strip the leading # if necessary
   *
   * @param { String } hash
   */
  getElementFromHash(hash) {
    if (!hash) {
      return null;
    }

    if (hash.substring(0, 1) === '#') {
      hash = hash.substring(1);
    }

    return document.getElementById(hash);
  }

  /**
   * If there is a hash in the current location, scroll to it using
   * offsets as necessary
   *
   * @param {boolean}  quick        [If true, moves instantly - no smooth scroll]
   * @param {function} callback     [Callback function]
   * @param {number}   extra_offset [Additional offset]
   */
  scrollToLocationHash(quick, callback, extra_offset) {
    if (window.location.hash) {
      this.scrollToHash(window.location.hash, true, callback, extra_offset);
    }
  }

  /**
   * Calculate the size of the offset needed. This will take into account
   * elements found using offset_sel as well as extra_offset
   */
  offsetHeight() {
    let offset_height = 0;

    for (let i = 0; i < this.offset_elems.length; i++) {
      const elem = this.offset_elems[i];

      offset_height += elem.offsetHeight;
    }

    return offset_height + this.extra_offset;
  }

  /**
   * Scroll the window to a given hash
   *
   * @param {string}   hash         [The hash to scroll to, including # symbol]
   * @param {boolean}  quick        [If true, moves instantly - no smooth scroll]
   * @param {function} callback     [Callback function]
   * @param {number}   extra_offset [Additional offset]
   */
  scrollToHash(hash, quick, callback, extra_offset) {
    let offset_height = this.offsetHeight();

    if (typeof extra_offset === 'number') {
      offset_height += extra_offset;
    }

    const target = this.getElementFromHash(hash);

    if (target) {
      let top_dist = this.distFromTop(target);
      let scroll_dist = Math.max(0, top_dist - offset_height);

      if (quick) {
        window.scroll(0, scroll_dist);
        this.setHash(hash);

        if (callback) {
          callback();
        }
      } else {
        this.doScrolling(scroll_dist, this.scroll_time);
      }
    }
  }

  /**
   * Get the distance between the top of the document and the top of a given
   * element
   *
   * @param {object} elem
   */
  distFromTop(elem) {
    let distance_scrolled = window.pageYOffset;
    let dist_from_viewport_top = elem.getBoundingClientRect().top;

    return distance_scrolled + dist_from_viewport_top;
  }

  /**
   * Scroll to a given position
   *
   * @param {number} y        [Distance from top of page to scroll to]
   * @param {number} duration [Time to take in ms]
   */
  doScrolling(y, duration) {
    let start_y = window.pageYOffset;
    let diff = y - start_y;
    let start;

    y = Math.max(Math.min(y, 0));

    window.requestAnimationFrame(function step(timestamp) {
      if (!start) {
        start = timestamp;
      }

      function inOutQuintEasing(t) {
        return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
      }

      let time = timestamp - start;
      let now = (timestamp - start) / duration;
      let ease = inOutQuintEasing(now);
      let percent = Math.min(time / duration, 1) * ease;
      let val = start_y + diff * percent;

      window.scrollTo(0, val);

      if (time < duration) {
        window.requestAnimationFrame(step);
      }
    });
  }

  /**
   * Set the hash part of the URL without scrolling the window
   *
   * @param {string} hash [New hash to set, including # symbol]
   */
  setHash(hash) {
    if (history.pushState) {
      history.pushState(null, null, hash);
    } else {
      location.hash = hash;
    }
  }
}
