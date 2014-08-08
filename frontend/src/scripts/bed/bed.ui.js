if (typeof BED === 'undefined') {
    window.BED = {};
}

BED.UI = (function() {

    var whitelisted = [
        'www.shire.com',
        'shire.com'
    ];

    var mediaQueries = {
        mobile: 'only screen and (max-width: 40em)',
        desktop: 'only screen and (min-width: 40.063em)'
    };

    var lastScrollPos = -1;

    var currentSection = '';

    var initialized = false;

    var historyIntialized = false;

    var velocityScroll = false;

    var init = function() {

        if (initialized) {
            return;
        }

        initialized = true;

        $.history.init(onHistoryChange, {
            unescape: ",/"
        });

        $('input, textarea').placeholder();

        // Setup events on window
        $(window)

        .on('scroll.ui', onScroll)

        .on('resize.ui', onResize);

        onScroll();

        onResize();

        // Setup fastclick
        FastClick.attach(document.body);

        // Setup default events on body
        $(document.body)

        .on('click.ui', 'a[href]:not(.button--ok)', onAnchorClick)

        .on('click.ui', '.tab-container', function(e) {

            $(this).toggleClass('open');

            $('.closed-text').toggleClass('hidden');

        });

        if (bowser.ios) {
            // Weird hack to fix scrolling in fixed position elements

            $('input').css('pointer-events', 'none');

            $('.slideout').on('click.iosfix', function(e) {

                $('input').css('pointer-events', 'all');

                var el = $(document.elementFromPoint(e.clientX, e.clientY));

                $('input').css('pointer-events', 'none');

                if (el.is('input')) {
                    el.focus();
                }

            });

            $(document).on('touchmove', function(e) {

                if ($(document.activeElement).is('input')) {
                    e.preventDefault();
                }

            });

        }

    };

    // Window scroll handler
    var onScroll = function(e) {
        // console.log(e);
        // console.log(velocityScroll);

        setTimeout(function() {

            var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
            var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

            // console.log('width: ', width);
            // console.log('height: ', height);

            var x = width / 2;
            var y = height * (1 / 2); //(2 / 3);

            // console.log('x: ', x);
            // console.log('y: ', y);

            var jqIsOpen = $('._is_open');

            // var origDisplayAttribute = jqIsOpen.css('display');
            jqIsOpen.css('display', 'none');

            var underneathElem = document.elementFromPoint(x, y);

            // console.log('underneathElem: ', underneathElem);
            // console.log('$.elementFromPoint: ', $.elementFromPoint(x, y));

            // if (origDisplayAttribute) {
            // jqIsOpen.css('display', origDisplayAttribute);
            // } else {
            jqIsOpen.css('display', 'block');
            // }

            var jqCurrent = $(underneathElem).closest('.section');

            var jqNext = jqCurrent.next('.section');

            jqCurrent.exists(function() {

                currentSection = jqCurrent.data('section');

                if (!velocityScroll) {
                    $.history.load('/' + currentSection);
                }

                $('.page-nav a.active').removeClass('active');

                $('.page-nav a[href="/#/' + jqCurrent.data('section') + '"]').addClass('active');

                $('.bar--next, .pagination__item').removeClass('active');

                $('.pagination__item').eq(jqCurrent.index()).addClass('active');

            });

            jqNext.exists(function() {

                $('.bar--next[data-section="' + jqNext.data('section') + '"]').addClass('active');

            });

        }, 1);

    };

    // Window resize handler
    var onResize = function(e) {

        var offset = $('.page-wrapper').offset().left;

        $('.pagination').css('right', offset + 8);

    };

    var onHistoryChange = function(hash) {
        // console.log(hash);

        if (!historyIntialized) {
            scrollTo(hash);
            historyIntialized = true;
        }
    };

    // Anchor click handler
    var onAnchorClick = function(e) {
        // console.log(e);

        var page = parseUri(window.location.href);
        var link = parseUri($(this).prop('href'));

        // check if the link and current page are on the same domain
        if (page.host === link.host) {

            // check if the link and the current page are the same file
            if (page.path === link.path) {

                e.preventDefault();

                // check if the link has a hash to scroll to
                if (link.anchor) {
                    $.history.load(link.anchor);
                    // var anchor = link.anchor;
                    var anchor = link.anchor.slice(1);
                    scrollTo(anchor);
                }
            }

        } else if (_.contains(whitelisted, link.host)) {

            // do nothing

        } else {

            e.preventDefault();

            BED.Modal.open('interstitial', link.source);
        }

    };

    var scrollTo = function(anchor) {

        var velocityComplete = function() {
            velocityScroll = false;
        };

        velocityScroll = true;

        $('[id="' + anchor + '"],[name="' + anchor + '"]').eq(0).velocity('scroll', {
            duration: 250
        });

        setTimeout(velocityComplete, 250);

    };

    // Return the module object
    return {
        init: init,
        mediaQueries: mediaQueries
    };

})();
