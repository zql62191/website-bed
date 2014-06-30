// Tiny jQuery Plugin
// by Chris Goodchild
$.fn.exists = function(callback) {
  var args = [].slice.call(arguments, 1);

  if (this.length) {
    callback.call(this, args);
  }

  return this;
};;(function($) {

  $.fn.extend({

    highlight: function(options) {

      this.defaultOptions = {
        className: 'highlight',
        delay: 150
      };

      var settings = $.extend({}, this.defaultOptions, options);

      return this.each(function() {

        var $this = $(this);

        (function(element, className, delay) {

          setTimeout(function() {

            element.removeClass(className);

          }, delay);

          element.addClass(className);

        })($this, settings.className, settings.delay);

      });

    }

  });

})(jQuery);