BED.UI = {

    gestures: {
        click: /*typeof Hammer !== 'undefined' ? 'tap' :*/ 'click'
    },

    mediaQueries: {
        mobile: 'only screen and (max-width: 40em)',
        desktop: 'only screen and (min-width: 40.063em)'
    },

    lastScrollPos: -1,

    init: function() {

        // Setup events on window
        $(window)

        .on('scroll', function(e) {

            var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
            var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

            var x = width / 2;
            var y = height * (2 / 3);

            var jqIsOpen = $('._is_open');

            var origDisplayAttribute = jqIsOpen.css('display');
            jqIsOpen.css('display', 'none');

            var underneathElem = document.elementFromPoint(x, y);

            if (origDisplayAttribute) {
                jqIsOpen.css('display', origDisplayAttribute);
            } else {
                jqIsOpen.css('display', 'block');
            }

            var jqCurrent = $(underneathElem).closest('.section');

            var jqNext = jqCurrent.next('.section');

            if (jqCurrent) {

                BED.currentPage = jqCurrent.data('section');

                $('.page-nav a.active').removeClass('active');

                $('.page-nav a[href="/#' + jqCurrent.data('section') + '"]').addClass('active');

                $('.bar--next, .pagination__item').removeClass('active');

                $('.pagination__item').eq(jqCurrent.index()).addClass('active');
            }

            if (jqNext) {
                $('.bar--next.bar--' + jqNext.data('section')).addClass('active');
            }
        })

        .trigger('scroll')

        .on('resize', function(e) {

            var offset = $('.page-wrapper').offset().left;

            $('.slideout').css({
                left: offset,
                right: offset
            });

            $('.modal__outer').css({
                width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
                height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
            });

            $('.pagination').css('right', offset + 8);

        })

        .trigger('resize');


        // Setup default events on body
        $(document.body)

        // .hammer({
        //     stop_browser_behavior: false
        // })

        .on('click', 'a[href]:not(.button--ok)', function(e) {

            var page = parseUri(window.location.href);
            var link = parseUri($(this).prop('href'));

            // check if the link and current page are on the same domain
            if (page.host === link.host) {

                // check if the link and the current page are the same file
                if (page.path === link.path) {

                    e.preventDefault();

                    // check if the link has a hash to scroll to
                    if (link.anchor) {
                        $('[id="' + link.anchor + '"],[name="' + link.anchor + '"]').eq(0).velocity('scroll', {
                            duration: 250
                        });
                    }
                }

            } else if (_.contains(BED.whitelisted, link.host)) {

                // do nothing

            } else {

                e.preventDefault();

                var jqModal = $('.modal--interstitial');

                jqModal.find('a.button--ok').prop('href', link.source);

                jqModal.velocity('fadeIn', {
                    duration: 250
                });
            }

        })

        .on(BED.UI.gestures.click, '.modal__inner', function(e) {
            e.stopPropagation();
        })

        .on(BED.UI.gestures.click, '.modal .modal__outer, .modal .modal__close, .modal a.button', function(e) {

            $(this).closest('.modal').velocity('fadeOut', {
                duration: 250
            });

        })

        .on(BED.UI.gestures.click, '.tab-container', function(e) {

            $(this).toggleClass('open');

            $('.closed-text').toggleClass('hidden');

        });

        // Init SlideOuts
        BED.UI.SlideOut.init();

    }
};
