window.onerror = function() {
  return true;
};

var BED = {

  init: function() {
    console.log('init');
  },

  nav: {
    open: function(e) {

      $('html').addClass('_menu_open');

      $('.mask--nav').velocity('fadeIn', {
        duration: 250
      });

      $('.page-nav').velocity('transition.slideLeftIn', {
        duration: 150,
        delay: 100,
        complete: function(elements) {
          $('.page-nav').addClass('_is_open');
        }
      });

    },
    close: function(e) {

      $('html').removeClass('_menu_open');

      $('.mask--nav').velocity('fadeOut', {
        duration: 150,
        delay: 100
      });

      $('.page-nav').velocity('transition.slideLeftOut', {
        duration: 250,
        complete: function(elements) {
          $('.page-nav').removeClass('_is_open');
        }
      });

    },
    toggle: function(e) {
      if ($('.page-nav').hasClass('_is_open')) {
        BED.nav.close();
      } else {
        BED.nav.open();
      }
    },
    tap: function(e) {

      $('.page-nav a.active').removeClass('active');

      $(this).addClass('active');

      BED.nav.close();

    }
  }

};

$(function() {

  // DEV
  $('.section').css({
    'height': $(window).height()
  });

  $(document.body).hammer({
    stop_browser_behavior: false
  });

  $(document.body).on('click', 'a', function(e) {
    e.preventDefault();
  });

  $(document.body).on('touch', '[data-highlight], .bar--next, nav a', function(e) {

    $(document.body).one('release', function() {
      $('.highlight').removeClass('highlight');
    });

    $(this).addClass('highlight');

  });

  $(document.body).on('tap', 'a[href^="#"]', function(e) {

    e.preventDefault();

    var anchor = $(this).attr('href');

    $(anchor).velocity('scroll', {
      duration: 250
    });

  });

  $(document.body).on('tap', '.btn--menu', BED.nav.toggle);

  $(document.body).on('tap', '.page-nav a', BED.nav.tap);

  $(document.body).on('tap', '.mask--nav', BED.nav.close);

  // $(document).on('scroll touchmove', function(e) {
  //   if ($('html').hasClass('_menu_open')) {
  //     e.preventDefault();
  //   }
  // });

});