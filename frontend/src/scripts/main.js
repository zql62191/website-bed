window.onerror = function() {
    return true;
};

var BED = {

    gestures: {
        // click: 'click'
        click: 'tap'
    },

    mq: {
        mobile: 'only screen and (max-width: 40em)',
        desktop: 'only screen and (min-width: 40.063em)'
    },

    whitelisted: [
        'www.shire.com',
        'shire.com'
    ],

    skrollr: {
        inst: null,
        ani: {
            // 'prevalence-header': {
            //     'data-bottom-top': 'opacity: 0; transform: translate3d(0px,-50px,0px)',
            //     'data-bottom-bottom': 'opacity: 1; transform: translate3d(0px,0,0px)'
            // },
            // 'prevalence-map': {
            //     'data-bottom-top': 'opacity: 0; transform: scale(0.5);',
            //     'data-center-center': 'opacity: 1; transform: scale(1);'
            // },
            // 'prevalence-asterisk': {
            //     'data-bottom-top': 'opacity: 0; transform: translate3d(100px,0px,0px)',
            //     'data-center-center': 'opacity: 1; transform: translate3d(0px,0,0px)'
            // },
            // 'prevalence-link': {
            //     'data-anchor-target': '.section--prevalence',
            //     'data-100-top': 'display: block;',
            //     'data-bottom': 'display: none;'
            // },
            // 'neurobiology-header': {
            //     'data-bottom-top': 'opacity: 0; transform: translate3d(0px,-50px,0px)',
            //     'data-bottom-bottom': 'opacity: 1; transform: translate3d(0px,0,0px)'
            // },
            'neurobiology-reward': {
                'data-bottom-top': 'opacity: 0; transform: translate3d(100px,0px,0px)',
                'data--10p-bottom': 'opacity: 1; transform: translate3d(0px,0,0px)'
            },
            'neurobiology-dysregulation': {
                'data-bottom-top': 'opacity: 0; transform: translate3d(-100px,0px,0px)',
                'data--10p-bottom': 'opacity: 1; transform: translate3d(0px,0,0px)'
            },
            'neurobiology-endogeneous': {
                'data-bottom-top': 'opacity: 0; transform: translate3d(100px,0px,0px)',
                'data--10p-bottom': 'opacity: 1; transform: translate3d(0px,0,0px)'
            },
            'neurobiology-risk': {
                'data-bottom-top': 'opacity: 0;',
                'data--10p-bottom': 'opacity: 1;'
            }
        }
    },

    init: function() {

        // setTimeout(function() {
        //     if (window.location.hash) {
        //         window.scrollTo(0, 0);
        //         window.location.hash = '';
        //     }
        // }, 1);

        if (window.matchMedia(BED.mq.desktop).matches || !bowser.mobile && !bowser.tablet) {

            // alert('skrollr initializing');

            // set up animations
            _.each(BED.skrollr.ani, function(value, key, collection) {

                var jqEl = $('[data-skrollr="' + key + '"]');

                if (jqEl.length > 0) {
                    jqEl.attr(value);
                } else {
                    console.warn('No matching element for animation: ', key);
                }
            });

            BED.skrollr.inst = skrollr.init({
                smoothScrolling: true,
                forceHeight: true,
                beforerender: function(data) {
                    // console.log('beforerender: ', data);
                    // return data.direction !== 'up';
                },
                render: function(data) {
                    // console.log('render: ', data);
                }
            });
        }

        $(window).on('resize', function(e) {

            var offset = $('.page-wrapper').offset().left;

            $('.slideout').css({
                left: offset,
                right: offset
            });

            $('.modal__outer').css({
                width: $(window).width(),
                height: $(window).height()
            });

        }).trigger('resize');

        $(document.body)

        .hammer({
            stop_browser_behavior: false
        })

        .on('click', 'a[href]:not(.button--ok)', function(e) {

            var page = parseUri(window.location.href);
            var link = parseUri($(this).prop('href'));

            if (page.host === link.host) {

                if (page.path === link.path) {

                    e.preventDefault();

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

        .on(BED.gestures.click, '.modal__inner', function(e) {
            e.stopPropagation();
        })

        .on(BED.gestures.click, '.modal .modal__outer, .modal .modal__close, .modal a.button', function(e) {

            $(this).closest('.modal').velocity('fadeOut', {
                duration: 250
            });

        })

        .on(BED.gestures.click, 'a[data-slideout]', function(e) {
            BED.slideout.toggle($(this).data('slideout'));
        })

        .on(BED.gestures.click, '.slideout', function(e) {
            BED.slideout.close($(this));
        })

        .on(BED.gestures.click, '.slideout .close', function(e) {
            BED.slideout.close($(this).closest('.slideout'));
        })

        .on(BED.gestures.click, '.slideout .slideout__inner', function(e) {
            e.stopPropagation();
        })

        .on(BED.gestures.click, '[data-video]', function(e) {

            var title = $(this).find('p').text();

            var jqModal = $('.modal--video');

            jqModal.find('h3').text(title);

            jqModal.velocity('fadeIn', {
                duration: 250
            });

        })

        .on(BED.gestures.click, '.page-nav a', function(e) {

            BED.slideout.close($('.slideout--menu'));

        })

        .on(BED.gestures.click, '.tab-container', function(e) {

            $(this).toggleClass('open');

            $('.closed-text').toggleClass('hidden');

        });

    },

    slideout: {

        open: function(el) {

            $('.slideout._is_open').exists(function() {
                BED.slideout.close($(this));
            });

            var jqSlideOut = el;
            var jqSlideOutInner = jqSlideOut.find('.slideout__inner');

            var getTransition = function(direction) {
                var transitions = {
                    'right': 'transition.slideRightIn',
                    'left': 'transition.slideLeftIn'
                };

                return transitions[direction] || 'fadeIn';
            };

            var transition = getTransition(jqSlideOut.data('direction'));

            if (bowser.mobile || window.matchMedia(BED.mq.mobile).matches) {
                jqSlideOutInner.css('padding-top', $('.page-header').offset().top);
            }

            jqSlideOut.addClass('_is_animating');

            jqSlideOut.velocity('fadeIn', {
                complete: function() {
                    jqSlideOut.addClass('_is_open').removeClass('_is_animating');
                },
                duration: 300
            });

            jqSlideOutInner.velocity(transition, {
                duration: 300
            });

        },

        close: function(el) {

            var jqSlideOut = el;
            var jqSlideOutInner = jqSlideOut.find('.slideout__inner');

            var getTransition = function(direction) {
                var transitions = {
                    'right': 'transition.slideRightOut',
                    'left': 'transition.slideLeftOut'
                };

                return transitions[direction] || 'fadeOut';
            };

            var transition = getTransition(jqSlideOut.data('direction'));

            jqSlideOut.addClass('_is_animating');

            jqSlideOut.velocity('fadeOut', {
                complete: function() {
                    jqSlideOut.removeClass('_is_open _is_animating');
                },
                duration: 300
            });

            jqSlideOutInner.velocity(transition, {
                duration: 300
            });

        },
        toggle: function(name) {

            var jqSlideOut = $('.slideout--' + name);

            if (jqSlideOut.hasClass('_is_open')) {
                BED.slideout.close(jqSlideOut);
            } else {
                BED.slideout.open(jqSlideOut);
            }

        }
    }

};
