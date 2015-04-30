var BED = (function() {

    var initialized = false;

    var snag = function() {

        $('.slideout').css({
            position: 'absolute',
            bottom: 0
        });

        var jqSections = $('.section');
        var jqNexts = $('.bar--next');

        $('.next-section, .next-section .content-wrap').css({
            position: 'absolute',
            height: 0,
            width: 0,
            top: 0,
            left: 0,
            right: 0
        });

        setTimeout(function() {

            $(window).scrollTop(9999999);

        }, 1);

        setTimeout(function() {
            $(window).scrollTop(0);
        }, 500);

        $('.pagination').hide();

        jqNexts.each(function(i, el) {

            $(el).css({
                position: 'absolute',
                display: 'block',
                top: jqSections.eq(i + 1).offset().top
            });

        });

        $(document.body).on('click.snag', function() {

            jqNexts.each(function(i, el) {

                $(el).css({
                    position: 'absolute',
                    display: 'block',
                    top: jqSections.eq(i + 1).offset().top
                });

            });
        });
    };

    var init = function() {

        if (initialized) {
            return;
        }

        initialized = true;

        // Init all the things!
        BED.Analytics.init();
        BED.Skrollr.init();
        BED.UI.init();
        BED.SlideOut.init();
        BED.Modal.init();
        BED.VideoPlayer.init();

        

        if (typeof parseUri(window.location.href).queryKey['snag'] !== 'undefined') {
            $(window).load(snag);
        }

        $('input, textarea').placeholder();

        $('[data-load]').each(function(i, el) {
            $(el).load($(el).data('load'));
        });

    };


    // Return the module object
    return {
        init: init
    };

})();
