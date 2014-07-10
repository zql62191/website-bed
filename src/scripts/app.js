window.onerror = function() {
  return true;
};

var BED = {

  // gestures: {
  //   down: 'touch',
  //   up: 'release',
  //   click: 'tap'
  // },

  gestures: {
    down: 'touchstart mousedown',
    up: 'touchend mouseup',
    click: 'click'
  },

  init: function() {

    // DEV
    // $('.section').css({
    //   'height': $(window).height()
    // });

    $(window).on('resize', function(e) {
      $('.page-nav').css({
        left: $('.page-wrapper').offset().left
      });
    }).trigger('resize');

    $(document.body).hammer({

      stop_browser_behavior: false

    })

    // .on(BED.gestures.click, 'a', function(e) {

    //   e.preventDefault();

    // })

    .on(BED.gestures.down, '[data-highlight], .bar--title, nav a', function(e) {

      $(this).addClass('highlight');

    })

    .on(BED.gestures.up, function() {

      $('.highlight').removeClass('highlight');

    })

    .on(BED.gestures.click, 'a[href^="#"]', function(e) {

      e.preventDefault();

      var jqAnchor = $($(this).attr('href').match(/\#.*$/ig)[0]);

      jqAnchor.velocity('scroll', {
        duration: 250
      });

    })

    .on(BED.gestures.click, '.btn--menu', BED.nav.toggle)

    .on(BED.gestures.click, '.page-nav a', BED.nav.tap)

    .on(BED.gestures.click, '.mask--nav', BED.nav.close);

    // $(document).on('scroll touchmove', function(e) {
    //   if ($('html').hasClass('_menu_open')) {
    //     e.preventDefault();
    //   }
    // });

  },

  nav: {
    open: function() {

      // $('html').addClass('_menu_open');

      $('.btn--menu, .mask--nav').prop('disabled', true);

      $('.mask--nav').velocity('fadeIn', {
        duration: 300
      });

      $('.page-nav nav').velocity('transition.slideLeftIn', {
        duration: 300,
        display: 'inline-block',
        complete: function(elements) {
          $('.page-nav').addClass('_is_open');
          $('.btn--menu, .mask--nav').prop('disabled', false);
        }
      });

    },
    close: function() {

      // $('html').removeClass('_menu_open');

      $('.btn--menu, .mask--nav').prop('disabled', true);

      $('.mask--nav').velocity('fadeOut', {
        duration: 300
      });

      $('.page-nav nav').velocity('transition.slideLeftOut', {
        duration: 300,
        complete: function(elements) {
          $('.page-nav').removeClass('_is_open');
          $('.btn--menu, .mask--nav').prop('disabled', false);
        }
      });

    },
    toggle: function() {
      if ($('.page-nav').hasClass('_is_open')) {
        BED.nav.close();
      } else {
        BED.nav.open();
      }
    },
    tap: function() {

      $('.page-nav a.active').removeClass('active');

      $(this).addClass('active');

      BED.nav.close();

    }
  }

};