$(function() {

  // DEV
  $('.section').css({
    'min-height': $(window).height()
  });

  $(document.body).hammer({
    behavior: {
      userSelect: true
    }
  });

  $(document.body).on('click', 'a', function(e) {
    e.preventDefault();
  });

  $(document.body).on('dragstart', function(e) {
    e.preventDefault();
  });

  // $(document.body).on('tap', 'a', function(e) {
  //   var currentUri = parseUri(window.location.href);
  //   var newUri = parseUri($(this).prop('href'));
  //   if (currentUri.host === newUri.host && currentUri.path === newUri.path && newUri.anchor) {
  //     $('#' + newUri.anchor).velocity('scroll', 300);
  //   } else {
  //     if ($(this).prop('target') === '_blank') {
  //       window.open(newUri.source, 'cwc_window');
  //     } else {
  //       window.location = newUri.source;
  //     }
  //   }
  // });

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

});