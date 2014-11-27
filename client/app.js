var $ = require('jquery'),
    _ = require('lodash');

App = {

  /**
   * Add the 'click' event listener on the .toggle div.
   * @return
   */
  _initializeToggle: function() {
    var $toggle = $('.toggle');
    if (!$toggle.length) return;

    $toggle.click(function(e) {
      $(this).toggleClass('open')
        .find('.fa')
          .toggleClass('fa-caret-down fa-caret-up')
          .end()
        .siblings('.slide-down')
          .slideToggle();
    });
  },

  init: function() {
    this._initializeToggle();
  }

};

module.exports = App;
