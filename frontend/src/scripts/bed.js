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

    

        
        $(document).ready(function() {


            /********************************************************************/
            // BED 2.0 Patient Profiles


            // desktop patient profile nav
            $('.profile-button')

            .on('click touch', function() {
                var target = $(this).data('target');

                $('.profile-button').removeClass('active-profile-button');
                $(this).addClass('active-profile-button');

                $('.profile').removeClass('active-profile');
                $('.' + target).addClass('active-profile');
            })

            .hover( function() {
                $(this).addClass('hover');
            }, function() {
                $(this).removeClass('hover');
            });


            // function to update status of next/previous arrows based on current profile (mobile only)
            var updateNavArrows = function(profileIndex) {

                console.log(profileIndex);

                $('.arrow').removeClass('inactive');

                switch (profileIndex) {
                    case 1:
                        $('.arrow-prev').addClass('inactive');
                        break;
                    case 4:
                        $('.arrow-next').addClass('inactive');
                        break;
                    default:
                        break;
                }

            };

            var profileWidth = 548; // width of an individual patient profile for mobile.

            // mobile patient profile nav
            $('.arrow').on('click touch', function() {

                var currentProfileIndex = parseInt($('.active-profile').data('profile-num'));

                // go to next profile
                if ($(this).hasClass('arrow-next') && !$(this).hasClass('inactive')) {

                    $('.active-profile').removeClass('active-profile').next().addClass('active-profile');
                        
                    $('.profile').css('transform', 'translateX( -' + currentProfileIndex * profileWidth + 'px)');

                    updateNavArrows(++currentProfileIndex);                

                // go to previous profile
                } else if ($(this).hasClass('arrow-prev') && !$(this).hasClass('inactive')) {

                    $('.active-profile').removeClass('active-profile').prev().addClass('active-profile');
                        
                    $('.profile').css('transform', 'translateX( -' + (currentProfileIndex-2) * profileWidth + 'px)');

                    updateNavArrows(--currentProfileIndex);
                }
            });

            /********************************************************************/
            // BED 2.0 Video section nav

            $('.video-nav li').on('click touch', function() {

                if (!$(this).hasClass('mobile-dropdown')) {

                    var target = $(this).add('.' + $(this).data('target')); // selector for selected tab and section

                    $('.video-section, .video-nav li').removeClass('active');
                    $(target).addClass('active');


                    if (window.matchMedia(BED.UI.mediaQueries.mobile).matches) {
                        $('.video-nav').removeClass('mobile-open');
                        $('.video-nav li').removeClass('second-row third-row');
                    }
                }
            });

            // mobile custom dropdown
            $('.mobile-dropdown').on('click touch', function(e) {
                $(this).parent().addClass('mobile-open');

                var options = $('.video-nav li').not( $('.video-nav li.active')).not('.mobile-dropdown');

                var index = 1;

                options.each( function() {

                    switch (index) {
                        case 1:
                            $(this).addClass('second-row');
                            index++;
                            break;
                        case 2:
                            $(this).addClass('third-row');
                            index++;
                            break;
                        default:
                            break;
                    }
                });
            });



        });
    };
    

    // Return the module object
    return {
        init: init
    };

})();
;if (typeof BED === 'undefined') {
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

        $('#' + document.location.hash.slice(2)).exists(function() {
            $(window).scrollTop($(this).offset().top);
        });

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

            jqIsOpen.css('display', 'none');

            var underneathElem = document.elementFromPoint(x, y);

            jqIsOpen.css('display', 'block');

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

                console.log('.bar--next[data-section="' + jqNext.data('section') + '"]');

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
;if (typeof BED === 'undefined') {
    window.BED = {};
}

BED.SlideOut = (function() {

    var scrollTopPosition = 0;

    var initialized = false;

    var focused = false;
    var init = function() {

        if (initialized) {
            return;
        }



        initialized = true;

        $(window)

        .on('resize.slideout', onResize);

        onResize();

        $(document.body)

        .on('click.slideout', 'a[data-slideout]', function(e) {
            toggle($(this).data('slideout'));
        })

        .on('click.slideout', '.slideout', function(e) {
            if (!focused) {
                close($(this));
            }
        })

        .on('click.slideout', '.slideout .close', function(e) {
            close($(this).closest('.slideout'));
        })

        .on('click.slideout', '.slideout .slideout__inner', function(e) {
            e.stopPropagation();
        })

        .on('click.slideout', '.page-nav a', function(e) {
            close($('.slideout--menu'));
        })

        .on('focus.slideout', '.slideout input, .slideout select', function(e) {
            focused = true;
        })

        .on('blur.slideout', '.slideout input, .slideout select', function(e) {
            setTimeout(function() {
                focused = false;
            }, 1);
        })

        // Remove focus from form on checkbox click (to allow iOS to scroll properly)
        .on('click.slideout', '.slideout .optin', function() {

            $(this).blur();
        });

        // Disable submit button on click
        // .on('click.slideout', '.slideout .submit', function() {

        //     if($(this).hasClass('disabled')) {

        //     }

        //     $(this).addClass('disabled');
        // });


        if (bowser.ios) {
            // Elegant hack to fix scrolling in fixed position elements


            $('.slideout input[type="text"]').css('pointer-events', 'none');

            $('.slideout').on('click.iosfix', function(e) {

                $('.slideout input[type="text"]').css('pointer-events', 'all');

                var el = $(document.elementFromPoint(e.clientX, e.clientY));

                $('.slideout input[type="text"]').css('pointer-events', 'none');

                if (el.is('input')) {
                    el.focus();
                }

            });

            // $(document).on('touchmove', function(e) {

            //     if ($(document.activeElement).is('input[type="text"]')) {
            //         e.preventDefault();
            //     }

            // });
        }
    };

    var onResize = function(e) {

        var offset = $('.page-wrapper').offset().left;

        $('.slideout').css({
            left: offset,
            right: offset
        });

    };

    var open = function(el) {


        scrollTopPosition = $('body').scrollTop();

        console.log('scroll top: ' + scrollTopPosition);

        $('.submit').removeClass('disabled');

        $('.slideout._is_open').exists(function() {
            close();
        });

        var jqSlideOut = (typeof el === 'string') ? $('.slideout--' + el) : el;
        var jqSlideOutInner = jqSlideOut.find('.slideout__inner');

        var getTransition = function(direction) {
            var transitions = {
                'right': 'transition.slideRightIn',
                'left': 'transition.slideLeftIn'
            };

            return transitions[direction] || 'fadeIn';
        };

        var transition = getTransition(jqSlideOut.data('direction'));

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

        $('body').css('overflow', 'hidden');

    };

    var close = function(el) {


        var jqSlideOut = $('.slideout._is_open');
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

        $('body').css('overflow', '');


        $('body').scrollTop(scrollTopPosition);

        //console.log($('body').scrollTop());

    };

    var toggle = function(name) {

        var jqSlideOut = $('.slideout--' + name);

        if (jqSlideOut.hasClass('_is_open')) {
            close(jqSlideOut);
        } else {
            open(jqSlideOut);
        }

    };

    // Return the module object
    return {
        init: init,
        open: open,
        close: close,
        toggle: toggle
    };

})();
;if (typeof BED === 'undefined') {
    window.BED = {};
}

BED.Modal = (function() {


    var initialized = false;

    var init = function() {

        if (initialized) {
            return;
        }

        initialized = true;

        $(window)

        .on('resize.modal', onResize);

        onResize();

        $(document.body)

        .on('click.modal', '.modal__inner', function(e) {
            e.stopPropagation();
        })

        .on('click.modal', '.modal .modal__outer, .modal .modal__close, .modal a.button', function(e) {

            close();

        });

    };

    var onResize = function(e) {

        $('.modal__outer').css({
            width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
            height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
        });

    };

    var open = function(el, url) {

        var jqModal = (typeof el === 'string') ? $('.modal--' + el) : $(el);

        if (jqModal.is('.modal--interstitial')) {
            jqModal.find('a.button--ok').prop('href', url);
        }

        jqModal.velocity('fadeIn', {
            duration: 250,
            complete: function(e) {
                $(this).addClass('_is_open');
            }
        });

    };

    var close = function() {

        $('.modal._is_open').velocity('fadeOut', {
            duration: 250,
            complete: function(e) {
                $(this).removeClass('_is_open');
            }
        });

    };

    // Return the module object
    return {
        init: init,
        open: open,
        close: close
    };

})();
;if (typeof BED === 'undefined') {
    window.BED = {};
}

BED.Skrollr = (function() {

    var animations = {

        // Prevalence
        'prevalence-header': {
            'data-bottom-top': 'opacity: 0; transform: translate3d(0px,-50px,0px)',
            'data-bottom-bottom': 'opacity: 1; transform: translate3d(0px,0,0px)'
        },
        'prevalence-map': {
            'data-bottom-top': 'opacity: 0; transform: scale(0.5);',
            'data-center-center': 'opacity: 1; transform: scale(1);'
        },
        'prevalence-asterisk': {
            'data-bottom-top': 'opacity: 0; transform: translate3d(100px,0px,0px);',
            'data-center-center': 'opacity: 1; transform: translate3d(0px,0,0px);'
        },
        'prevalence-mf-text-1': {
            'data-bottom-top': 'opacity: 0; transform: translate3d(0px,100px,0px);',
            'data-center': 'opacity: 1; transform: translate3d(0px,0px,0px)'
        },
        'prevalence-mf-text-2': {
            'data-bottom-top': 'opacity: 0; transform: translate3d(0px,100px,0px)',
            'data-center': 'opacity: 1; transform: translate3d(0px,0px,0px)'
        },
        'prevalence-male-graphic': {
            'data-bottom-top': 'opacity: 0; transform: translate3d(500px,0px,0px)',
            'data-450-top-top': 'opacity: 1; transform: translate3d(0px,0,0px)'
        },
        'prevalence-female-graphic': {
            'data-bottom-top': 'opacity: 0; transform: translate3d(-500px,0px,0px)',
            'data-450-top-top': 'opacity: 1; transform: translate3d(0px,0,0px)'
        },
        'prevalence-blurb-2': {
            'data-bottom-top': 'opacity: 0; transform: translate3d(0px,100px,0px)',
            'data-center': 'opacity: 1; transform: translate3d(0px,0,0px)'
        },

        //Prevalence Patients
        'patient-1': {
            'data-bottom-top': 'transform: translate3d(-800px,0px,0px);',
            'data--25p-bottom': 'transform: translate3d(0px,0px,0px);'
        },
        'patient-2': {
            'data-bottom-top': 'transform: translate3d(-800px,0px,0px);',
            'data--20p-bottom': 'transform: translate3d(0px,0px,0px);'
        },
        'patient-3': {
            'data-bottom-top': 'transform: translate3d(-800px,0px,0px);',
            'data--15p-bottom': 'transform: translate3d(0px,0px,0px);'
        },
        'patient-4': {
            'data-bottom-top': 'transform: translate3d(-800px,0px,0px);',
            'data--10p-bottom': 'transform: translate3d(0px,0px,0px);'
        },

        //Neurobiology
        'neurobiology-header': {
            'data-bottom-top': 'opacity: 0; transform: translate3d(0px,-50px,0px)',
            'data-center': 'opacity: 1; transform: translate3d(0px,0,0px)'
        },
        'neurobiology-header-2': {
            'data-bottom-top': 'opacity: 0;',
            'data-center': 'opacity: 1;'
        },
        'neurobiology-reward': {
            'data-bottom-top': 'opacity: 0; transform: translate3d(100px,0px,0px)',
            'data-center': 'opacity: 1; transform: translate3d(0px,0,0px)'
        },
        'neurobiology-dysregulation': {
            'data-bottom-top': 'opacity: 0; transform: translate3d(-100px,0px,0px)',
            'data-center': 'opacity: 1; transform: translate3d(0px,0,0px)'
        },
        'neurobiology-endogeneous': {
            'data-bottom-top': 'opacity: 0; transform: translate3d(100px,0px,0px)',
            'data-center': 'opacity: 1; transform: translate3d(0px,0,0px)'
        },
        'neurobiology-risk': {
            'data-bottom-top': 'opacity: 0; transform: translate3d(-100px,0px,0px)',
            'data-center': 'opacity: 1; transform: translate3d(0px,0,0px)'
        },
        'neurobiology-risk-2': {
            'data-bottom-top': 'opacity: 0; transform: translate3d(100px,0px,0px)',
            'data-center': 'opacity: 1; transform: translate3d(0px,0,0px)'
        },

        //Course
        'course-title': {
            'data-bottom-top': 'opacity: 0; transform: translate3d(0px,-50px,0px)',
            'data-center': 'opacity: 1; transform: translate3d(0px,0,0px)'
        },
        'course-21-numbers': {
            'data--10p-bottom': 'transform: translate3d(732px,0px,0px);',
            'data--20p-bottom': 'transform: translate3d(0px,0px,0px); opacity: 1;',
            'data--40p-bottom': 'opacity: 0;'
        },
        'course-21-copy': {
            'data--20p-bottom': 'opacity: 0; transform: scale(0);',
            'data--30p-bottom': 'opacity: 1; transform: scale(1);'
        },
        'course-80': {
            'data-bottom-top': 'opacity: 0; transform: scale(0.5);',
            'data-450-top-top': 'opacity: 1; transform: scale(1);'
        },
        'course-49': {
            'data-bottom-top': 'opacity: 0; transform: scale(0.5);',
            'data-450-top-top': 'opacity: 1; transform: scale(1);'
        },

        //Effects
        'effects-title': {
            'data-bottom-top': 'opacity: 0; transform: translate3d(0px,-50px,0px)',
            'data-center': 'opacity: 1; transform: translate3d(0px,0,0px)'
        },
        'effects-63': {
            'data-bottom-top': 'opacity: 0; transform: scale(0.5);',
            'data-center': 'opacity: 1; transform: scale(1);'
        },
        'effects-19': {
            'data-bottom-top': 'opacity: 0; transform: scale(0.5);',
            'data-center': 'opacity: 1; transform: scale(1);'
        },

        //Diagnosis
        'diagnosis-circle': {
            'data-bottom-top': 'transform: rotate(-180deg);',
            'data-center': 'transform: rotate(0deg);'
        },
        'diagnosis-50': {
            'data-bottom-top': 'opacity: 0;',
            'data-center': 'opacity: 1;'
        },
        'diagnosis-50-caption': {
            'data-bottom-top': 'opacity: 0;',
            'data-center': 'opacity: 1;'
        },
        'diagnosis-19': {
            'data-bottom-top': 'opacity: 0; transform: scale(0.5);',
            'data-center': 'opacity: 1; transform: scale(1);'
        },
        'diagnosis-36': {
            'data-bottom-top': 'opacity: 0; transform: scale(0.5);',
            'data-center': 'opacity: 1; transform: scale(1);'
        },

        //Resources
        'resources-signup': {
            'data-bottom-top': 'opacity: 0;',
            'data-center': 'opacity: 1;'
        }

    };

    var instance = null;

    var initialized = false;

    var init = function() {

        if (initialized) {
            return;
        }

        initialized = true;

        // Disable on Mobile/Tablet/IE
        if (!bowser.mobile && !bowser.tablet && !bowser.msie) {

            // Setup skrollr animation attributes
            $('[data-skrollr]').each(function(i, el) {

                var name = $(el).data('skrollr');

                var attrs = animations[name];

                if (attrs) {
                    $(el).attr(attrs);
                }

            });

            // Initialize skrollr
            instance = window.skrollr.init({
                smoothScrolling: true,
                forceHeight: true,
                beforerender: function(data) {
                    // console.log('beforerender: ', data);

                    // Disable on scroll up
                    return data.direction !== 'up';
                },
                render: function(data) {
                    // console.log('render: ', data);
                }
            });

        }

    };
    // Return the module object
    return {
        init: init,
        instance: function() {
            return instance;
        }
    };

})();
;if (typeof BED === 'undefined') {
    window.BED = {};
}

var homeVideoPlayer;

BED.VideoPlayer = (function() {

    var videoLocationList = {
        'grilo2': '//d2ly9zedmmzqz4.cloudfront.net/BED-S02969.mp4',     // S02969 Grilo2
        'kornstein8': '//d2ly9zedmmzqz4.cloudfront.net/BED-S03012.mp4', // S03012 Kornstein8
        'grilo7': '//d2ly9zedmmzqz4.cloudfront.net/BED-S03011.mp4',     // S03011 Grilo7
        'bulik12': '//d2ly9zedmmzqz4.cloudfront.net/BED-S03016.mp4',    // S03016 Bulik12
        'grilo5': '//d2ly9zedmmzqz4.cloudfront.net/BED-S02972.mp4',     // S02972 Grilo5
        'kornstein6': '//d2ly9zedmmzqz4.cloudfront.net/BED-S02973.mp4', // S02973 Kornstein6
        'kornstein14': '//d2ly9zedmmzqz4.cloudfront.net/BED-S03018.mp4', // S03018 Kornstein14

        // videos added 10/27/14
        'bulik4': '//d2ly9zedmmzqz4.cloudfront.net/BED-S03323.mp4',     // S03323
        'bulik3': '//d2ly9zedmmzqz4.cloudfront.net/BED-S03322.mp4',     // S03322
        'wilfley10': '//d2ly9zedmmzqz4.cloudfront.net/BED-S03014.mp4',  // S03014
        'wilfley9': '//d2ly9zedmmzqz4.cloudfront.net/BED-S03013.mp4',   // S03013
        'wilfley13': '//d2ly9zedmmzqz4.cloudfront.net/BED-S03017.mp4',   // S03017

        // BED 2.0 physician television network videos
        'chapter1': '//view.vzaar.com/2604892/video', // S02868 Chapter 1
        'chapter2': '//view.vzaar.com/2604904/video', // S03499 Chapter 2
        'chapter3': '//view.vzaar.com/2604919/video', // S03500 Chapter 3
        'chapter4': '//view.vzaar.com/2604928/video', // S03501 Chapter 4
        'chapter5': '//view.vzaar.com/2604935/video', // S03502 Chapter 5
        'chapter6': '//view.vzaar.com/2604941/video', // S03503 Chapter 6

        // BED 2.0 Home section videos


    };

    var videoTitleList = {
        'grilo2': 'How does the prevalence of BED compare',
        'kornstein8': 'Does BED occur in both women and men?',
        'grilo7': 'How does the prevalence of BED compare among races/ethnicities?',
        'bulik12': 'What is the clinical course of BED?',
        'grilo5': 'What psychiatric disorders are commonly associated with BED?',
        'kornstein6': 'What is thought to cause BED?',
        'kornstein14': 'How can clinicians begin an effective conversation',

        'bulik4': 'What are the essential features for a diagnosis of BED?',
        'bulik3': 'What are the functional consequences of BED in adults?',
        'wilfley10': 'How is BED distinct from bulimia nervosa?',
        'wilfley9': 'How is BED distinct from overeating and obesity?',
        'wilfley13': 'What is the relationship between obesity and BED in adults?',

        // BED 2.0 physician television network videos
        'chapter1': 'Living with B.E.D.',
        'chapter2': 'Diagnostic criteria for B.E.D.',
        'chapter3': 'Possible causes of B.E.D.',
        'chapter4': 'Recognizing adult patients with B.E.D.',
        'chapter5': 'Functional consequences of B.E.D.',
        'chapter6': 'Diagnosing B.E.D. in adult patients'

        // BED 2.0 home section videos
          
    };

    var audioSamples = {
        'sample1': 'media/TestAudio.mp3',
        'sample2': 'media/TestAudio.mp3'
    };

    var videoNameList = [];

    var currentVideoName = '';

    var currentVideoTitle = '';

    var p0 = false;
    var p25 = false;
    var p50 = false;
    var p75 = false;
    var p90 = false;
    var p100 = false;

    var instance = null;

    var initialized = false;

    var init = function() {

        if (initialized) {
            return;
        }

        initialized = true;

        /*************************************************************************/
        /* Home Section video player */


        /* ----------- Variables -----------*/
        


        /* ----------- Video Index Cookie - getter/setter -----------*/

        // set which home video will be played based on its index
        function setVideoCookie(index) {

            //var expirationDate = lasdkjfas;ldfkas;
            //var expires = "expires=" + expirationDate;
            document.cookie = 'videoIndex  = ' + index; // + "; " + expires;
        }

        // get the current value of the video cookie to determine which video to play
        function getCookie(cname) {
            var name = cname + "=";
            var ca = document.cookie.split(';');

            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                
                while (c.charAt(0) === ' ') {
                    c = c.substring(1); 
                }
                if (c.indexOf(name) === 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";
        }

        // testing function to delete the cookie - to be used in console
        function deleteVideoCookie() {
            document.cookie = 'videoIndex=';
        }


        /* ----------- Video Controls -----------*/

        // create a video player on the current video
        function createVideoPlayer(index) {

            var heroVideos = [
                '//view.vzaar.com/2552732/video',
                '//view.vzaar.com/2552735/video',
                '//view.vzaar.com/2552736/video',
                '//view.vzaar.com/2552737/video'
            ];

            //var selectorString = '.home-video-' + index;
            
            var player;    

            // set up mediaElement js with custom settings
            // var player = new MediaElementPlayer(selectorString, {

            $('#heroPlayer').mediaelementplayer({
                pauseOtherPlayers: false,       // allow multiple videos
                startVolume: 0, // there is no audio
                features: [],
                autoRewind: false,
                success: function(mediaElement) {

                    player = mediaElement;

                    // Load video
                    mediaElement.setSrc(document.location.protocol + heroVideos[index-1]);

                    // Load video?
                    mediaElement.load();

                    mediaElement.setVolume(0);

                    mediaElement.play();

                },
                error: function () {
                    console.log('The video did not load properly.');
                }
            });

            return player;
        }

        // play the video at the desired index
        function playHomeVideo(index) {

            // only play the video in desktop view - video is hidden otherwise
            if (window.matchMedia(BED.UI.mediaQueries.desktop).matches) {

                $('.home-video').removeClass('active');

                $('.home-video-container')
                    .removeClass('video-1 video-2 video-3 video-4')
                    .addClass('video-' + index);

                switch (index) {
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                        homeVideoPlayer = createVideoPlayer(index);
                        break;
                    default:
                        homeVideoPlayer = createVideoPlayer(1);
                        break;
                }

                //console.log(homeVideoPlayer.src);

                homeVideoPlayer.play();
            } else {

                // console.log('show mobile image');
                $('.section--home').addClass('mobile-bg mobile-bg-' + index);
            }

            $('.section--home .content-wrap').addClass('active');
        }

        /* Audio */
        function initAudio() {
            if (window.matchMedia(BED.UI.mediaQueries.desktop).matches) {
                $('.audio-sample1').mediaelementplayer({
                    audioWidth: 229,
                    features: ['playpause', 'current', 'progress', 'duration'],
                    success: onAudioSuccess
                });

                $('.audio-sample2').mediaelementplayer({
                    audioWidth: 229,
                    features: ['playpause', 'current', 'progress', 'duration'],
                    success: onAudioSuccess
                });
            } else {
                $('.audio-sample1').mediaelementplayer({
                    audioWidth: 509,
                    audioHeight: 60,
                    iPadUseNativeControls: false,
                    iPhoneUseNativeControls: false,
                    AndroidUseNativeControls: false,
                    features: ['playpause', 'current', 'progress', 'duration'],
                    success: onAudioSuccess
                });

                $('.audio-sample2').mediaelementplayer({
                    audioWidth: 509,
                    audioHeight: 60,
                    iPadUseNativeControls: false,
                    iPhoneUseNativeControls: false,
                    AndroidUseNativeControls: false,
                    features: ['playpause', 'current', 'progress', 'duration'],
                    success: onAudioSuccess
                });
            }
        }

        /* ----------- Init -----------*/

        initAudio();

        // Set/get cookie to determine which video loads:
        var oldVideoCookie = getCookie('videoIndex');

        $('.home-video').ready( function() {

            var newVideoCookie;

            if (oldVideoCookie === '') {    // if the cookie has not been set

                // set it to 1 and play video number 1
                setVideoCookie(1);
                playHomeVideo(1);

            } else if (parseInt(oldVideoCookie, 10) === 4) {    // the cookie has reached the last video index value

                newVideoCookie = 1;     // reset it to first video
                setVideoCookie(newVideoCookie);
                playHomeVideo(newVideoCookie);

            } else {    // normal case
                newVideoCookie = parseInt(oldVideoCookie, 10) + 1;
                setVideoCookie(newVideoCookie);
                playHomeVideo(newVideoCookie);
            }
        });
        

        /*************************************************************************/
        /* Videos Section video player */

        // Generate playlist order list (used in next/prev functionality)
        $('.video-playlist li').each(function(i, el) {

            videoNameList.push($(el).data('video'));

            // Load first video in list
            if (i === 0) {
                currentVideoName = videoNameList[i];
                currentVideoTitle = videoTitleList[currentVideoName];
                $('#videoPlayer source').attr('src', document.location.protocol + videoLocationList[currentVideoName]);
                $(el).addClass('active');
            }

        });


        // Setup MediaElementJS

        $('#videoPlayer').attr({

            width: window.matchMedia(BED.UI.mediaQueries.mobile).matches ? 536 : 800,
            height: window.matchMedia(BED.UI.mediaQueries.mobile).matches ? 315 : 450

        }).mediaelementplayer({

            pauseOtherPlayers: false,       // allow multiple videos
            iPadUseNativeControls: true,    // force iPad's native controls
            iPhoneUseNativeControls: true,  // force iPhone's native controls
            AndroidUseNativeControls: true, // force Android's native controls
            success: onSuccess,
            error: onError
        });

        // Setup UI Events

        $(document.body)

        // BED 2.0 updated event listener:
        .on('click.videoplayer', '.video-thumb[data-video]', function(e) {
            playVideo($(this).data('video'));
        })

        .on('click.videoplayer', '.video-player .arrow-left', function(e) {
            playPrevVideo();
        })

        .on('click.videoplayer', '.video-player .arrow-right', function(e) {
            playNextVideo();
        });



    };

    var onAudioSuccess = function(me, domObject) {
        //console.log(me + '\n' + domObject);

        if ($(me).hasClass('audio-sample1')) {

            $('.play-sample1').click( function() {
                var target = $(this).data('target');
                me.play();
            });
            
        } else if ($(me).hasClass('audio-sample2')) {

            $('.play-sample2').click( function() {
                var target = $(this).data('target');
                me.play();
            });
        }

    };

    // MediaElementJS success handler
    var onSuccess = function(me, domObject) {
        // console.log('success');

        //console.log(me);

        me.pause();

        instance = me;

        // Setup player listeners
        $(instance)

        .on('loadeddata', onLoadedData)

        .on('timeupdate', onTimeUpdate)

        .on('ended', onEnded);

        $('.mejs-container.svg').removeClass('svg').addClass('no-svg');

        // Load video
        instance.setSrc(document.location.protocol + videoLocationList[currentVideoName]);

        // Load video?
        instance.load();
    };

    // MediaElementJS error handler
    var onError = function() {
        // console.log('error');
    };

    // MediaElementJS loadeddata handler
    var onLoadedData = function(e) {

        // Reset percentage milestones
        p0 = p25 = p50 = p75 = p90 = p100 = false;
    };

    // MediaElementJS timeupdate handler
    var onTimeUpdate = function(e) {

        // Calculate current percentage viewed
        var currentPercentage = (instance.currentTime / instance.duration) * 100;

        if (currentPercentage === 0) {
            // hits 0 percentage after video ended
            return;
        }

        if (currentPercentage >= 0 && !p0) {
            // Check if more than 0% viewed and if not previously fired

            p0 = true;

            // fire 'Video Play'
            BED.Analytics.videoOnPlay(currentVideoTitle);

        } else if (currentPercentage >= 25 && !p25) {
            // Check if more than 25% viewed and if not previously fired

            p25 = true;

            // fire 'Video Milestone' @ 25%
            BED.Analytics.videoOnPercentage(currentVideoTitle, 25);

        } else if (currentPercentage >= 50 && !p50) {
            // Check if more than 50% viewed and if not previously fired

            p50 = true;

            // fire 'Video Milestone' @ 50%
            BED.Analytics.videoOnPercentage(currentVideoTitle, 50);

        } else if (currentPercentage >= 75 && !p75) {
            // Check if more than 75% viewed and if not previously fired

            p75 = true;

            // fire 'Video Milestone' @ 75%
            BED.Analytics.videoOnPercentage(currentVideoTitle, 75);

        } else if (currentPercentage >= 90 && !p90) {
            // Check if more than 90% viewed and if not previously fired

            p90 = true;

            // fire 'Video Complete'
            BED.Analytics.videoOnComplete(currentVideoTitle);

        } else if (currentPercentage >= 99 && !p100) {
            // Check if more than 100% viewed and if not previously fired

            p100 = true;

            // fire 'Video Milestone' @ 100%
            BED.Analytics.videoOnPercentage(currentVideoTitle, 100);

        }
    };

    // MediaElementJS ended handler
    var onEnded = function(e) {

        // Reset percentage milestones
        p0 = p25 = p50 = p75 = p90 = p100 = false;
    };

    // Internal video player controls
    var playVideo = function(name) {

        // Get playlist items
        var jqPlaylistItems = $('.video-playlist li');
        // Get next playlist item
        var jqNextPlaylistItem = jqPlaylistItems.filter('[data-video="' + name + '"]');

        // Toggle active classes
        jqPlaylistItems.removeClass('active');
        jqNextPlaylistItem.addClass('active');

        // Set name/title variables
        currentVideoName = name;
        currentVideoTitle = videoTitleList[currentVideoName];

        // Scroll player into view
        $('.video-player').velocity('scroll', {
            duration: 250,
            offset: '-' + ($('.page-header').height() + 20)
        });

        // Load video
        instance.setSrc(document.location.protocol + videoLocationList[currentVideoName]);

        // Load video?
        instance.load();

        console.log('instance: ' + instance);

        // Play video
        instance.play();
    };

    var playNextVideo = function() {

        var currentIndex = _.indexOf(videoNameList, currentVideoName);

        var nextIndex = (function() {
            var idx;

            if (currentIndex === videoNameList.length - 1) {
                idx = 0;
            } else {
                idx = currentIndex + 1;
            }

            return idx;
        })();

        playVideo(videoNameList[nextIndex]);

    };

    var playPrevVideo = function() {

        var currentIndex = _.indexOf(videoNameList, currentVideoName);

        var nextIndex = (function() {
            var idx;

            if (currentIndex === 0) {
                idx = videoNameList.length - 1;
            } else {
                idx = currentIndex - 1;
            }

            return idx;
        })();

        playVideo(videoNameList[nextIndex]);

    };

    // Return the module object
    return {
        init: init,
        instance: function() {
            return instance;
        }
    };

})();
;if (typeof BED === 'undefined') {
    window.BED = {};
}

BED.Analytics = (function() {

    var initialized = false;

    var init = function() {

        if (initialized) {
            return;
        }

        initialized = true;

    };

    // Video Play Handler
    var videoOnPlay = function(name) {

        console.log('videoOnPlay fired: ', name);

        if (typeof window.mediaPlayHandler !== 'undefined') {
            window.mediaPlayHandler('Video > ' + name);
        }
    };

    // Video Milestone Handler
    var videoOnPercentage = function(name, percentage) {

        console.log('videoOnPercentage fired: ', name, percentage);

        if (typeof window.mediaMilestoneHandler !== 'undefined') {
            window.mediaMilestoneHandler('Video > ' + name, percentage);
        }
    };

    // Video Complete Handler
    var videoOnComplete = function(name) {

        console.log('videoOnComplete fired: ', name);

        if (typeof window.mediaCompleteHandler !== 'undefined') {
            window.mediaCompleteHandler('Video > ' + name);
        }
    };

    var formOnComplete = function(name) {

        console.log('formOnComplete fired: ', name);

        if (typeof window.formCompleteHandler !== 'undefined') {
            window.formCompleteHandler(name);
        }

    };

    // Return the module object
    return {
        init: init,
        videoOnPlay: videoOnPlay,
        videoOnPercentage: videoOnPercentage,
        videoOnComplete: videoOnComplete,
        formOnComplete: formOnComplete
    };

})();
