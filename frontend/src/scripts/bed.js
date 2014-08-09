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

    var initialized = false;

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
            close($(this));
        })

        .on('click.slideout', '.slideout .close', function(e) {
            close($(this).closest('.slideout'));
        })

        .on('click.slideout', '.slideout .slideout__inner', function(e) {
            e.stopPropagation();
        })

        .on('click.slideout', '.page-nav a', function(e) {
            close($('.slideout--menu'));
        });
    };

    var onResize = function(e) {

        var offset = $('.page-wrapper').offset().left;

        $('.slideout').css({
            left: offset,
            right: offset
        });

    };

    var open = function(el) {

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

        // $('body').addClass('modal-open');//css('overflow', 'hidden');

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

        // $('body').removeClass('modal-open');

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

BED.VideoPlayer = (function() {

    var videoLocationList = {
        'grilo2': '//d2ly9zedmmzqz4.cloudfront.net/BED-S02969.mp4', // S02969 Grilo2
        'kornstein8': '//d2ly9zedmmzqz4.cloudfront.net/BED-S03012.mp4', // S03012 Kornstein8
        'grilo7': '//d2ly9zedmmzqz4.cloudfront.net/BED-S03011.mp4', // S03011 Grilo7
        'bulik12': '//d2ly9zedmmzqz4.cloudfront.net/BED-S03016.mp4', // S03016 Bulik12
        'grilo5': '//d2ly9zedmmzqz4.cloudfront.net/BED-S02972.mp4', // S02972 Grilo5
        'kornstein6': '//d2ly9zedmmzqz4.cloudfront.net/BED-S02973.mp4', // S02973 Kornstein6
        'kornstein14': '//d2ly9zedmmzqz4.cloudfront.net/BED-S03018.mp4' // S03018 Kornstein14
    };

    var videoTitleList = {
        'grilo2': 'How does the prevalence of BED compare',
        'kornstein8': 'Does BED occur in both women and men?',
        'grilo7': 'How does the prevalence of BED compare among races/ethnicities?',
        'bulik12': 'What is the clinical course of BED?',
        'grilo5': 'What psychiatric disorders are commonly associated with BED?',
        'kornstein6': 'What is thought to cause BED?',
        'kornstein14': 'How can clinicians begin an effective conversation'
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

        // console.log('videoNameList: ', videoNameList);
        // console.log('videoTitleList: ', videoTitleList);

        // Setup MediaElementJS

        $('#videoPlayer').attr({

            width: window.matchMedia(BED.UI.mediaQueries.mobile).matches ? 560 : 800,

            height: window.matchMedia(BED.UI.mediaQueries.mobile).matches ? 315 : 450

        }).mediaelementplayer({

            // force iPad's native controls
            iPadUseNativeControls: true,

            // force iPhone's native controls
            iPhoneUseNativeControls: true,

            // force Android's native controls
            AndroidUseNativeControls: true,

            success: onSuccess,

            error: onError

        });

        // Setup UI Events

        $(document.body)

        .on('click.videoplayer', '.video-playlist li[data-video]', function(e) {

            playVideo($(this).data('video'));

        })

        .on('click.videoplayer', '.video-player .arrow-left', function(e) {

            playPrevVideo();

        })

        .on('click.videoplayer', '.video-player .arrow-right', function(e) {

            playNextVideo();

        });

    };

    // MediaElementJS success handler
    var onSuccess = function(mediaElement, domObject) {
        // console.log('success');

        instance = mediaElement;

        // Setup player listeners
        $(instance)

        .on('loadeddata', onLoadedData)

        .on('timeupdate', onTimeUpdate)

        .on('ended', onEnded);

        $('.mejs-container.svg').removeClass('svg').addClass('no-svg');

    };

    // MediaElementJS error handler
    var onError = function() {
        // console.log('error');
    };

    // MediaElementJS loadeddata handler
    var onLoadedData = function(e) {
        // console.log(e);

        // Reset percentage milestones
        p0 = p25 = p50 = p75 = p90 = p100 = false;
    };

    // MediaElementJS timeupdate handler
    var onTimeUpdate = function(e) {
        // console.log(e);

        // Calculate current percentage viewed
        var currentPercentage = (instance.currentTime / instance.duration) * 100;

        if (currentPercentage === 0) {
            // hits 0 percentage after video ended
            return;
        }

        // console.log('currentPercentage: ', currentPercentage);

        if (currentPercentage >= 0 && !p0) {
            // Check if more than 0% viewed and if not previously fired

            // console.log('0%');

            p0 = true;

            // fire 'Video Play'
            BED.Analytics.videoOnPlay(currentVideoTitle);

        } else if (currentPercentage >= 25 && !p25) {
            // Check if more than 25% viewed and if not previously fired

            // console.log('25%');

            p25 = true;

            // fire 'Video Milestone' @ 25%
            BED.Analytics.videoOnPercentage(currentVideoTitle, 25);

        } else if (currentPercentage >= 50 && !p50) {
            // Check if more than 50% viewed and if not previously fired

            // console.log('50%');

            p50 = true;

            // fire 'Video Milestone' @ 50%
            BED.Analytics.videoOnPercentage(currentVideoTitle, 50);

        } else if (currentPercentage >= 75 && !p75) {
            // Check if more than 75% viewed and if not previously fired

            // console.log('75%');

            p75 = true;

            // fire 'Video Milestone' @ 75%
            BED.Analytics.videoOnPercentage(currentVideoTitle, 75);

        } else if (currentPercentage >= 90 && !p90) {
            // Check if more than 90% viewed and if not previously fired

            // console.log('90%');

            p90 = true;

            // fire 'Video Complete'
            BED.Analytics.videoOnComplete(currentVideoTitle);

        } else if (currentPercentage >= 99 && !p100) {
            // Check if more than 100% viewed and if not previously fired

            // console.log('100%');

            p100 = true;

            // fire 'Video Milestone' @ 100%
            BED.Analytics.videoOnPercentage(currentVideoTitle, 100);

        }
    };

    // MediaElementJS ended handler
    var onEnded = function(e) {
        // console.log(e);

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
        $('.mejs-container').velocity('scroll', {
            duration: 250,
            offset: '-' + ($('.page-header').height() + 20)
        });

        // Load video
        instance.setSrc(document.location.protocol + videoLocationList[currentVideoName]);

        // Load video?
        instance.load();

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

        var currentIndex = _.indexOf(videoNameList, currentVideo);

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

//# sourceMappingURL=bed.js.map