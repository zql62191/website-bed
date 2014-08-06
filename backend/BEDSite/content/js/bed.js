var BED = (function() {

    var initialized = false;

    var snag = function() {

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

        $(document).on('click', function() {

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

    var gestures = {
        'click': typeof Hammer !== 'undefined' ? 'tap' : 'click',
        'scroll': 'scroll',
        'resize': 'resize'
    };

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

        // Setup events on window
        $(window)

        .on(gestures.scroll + '.ui', onScroll)

        .trigger(gestures.scroll + '.ui')

        .on(gestures.resize + '.ui', onResize)

        .trigger(gestures.resize + '.ui');

        // Setup default events on body
        $(document.body)

        .run(function() {
            if (typeof Hammer !== 'undefined') {
                $(document.body).hammer({
                    stop_browser_behavior: false
                });
            } else {
                FastClick.attach(document.body);
            }
        })

        .on('click' + '.ui', 'a[href]:not(.button--ok)', onAnchorClick)

        .on(gestures.click + '.ui', '.modal__inner', function(e) {
            e.stopPropagation();
        })

        .on(gestures.click + '.ui', '.modal .modal__outer, .modal .modal__close, .modal a.button', function(e) {

            $(this).closest('.modal').velocity('fadeOut', {
                duration: 250
            });

        })

        .on(gestures.click + '.ui', '.tab-container', function(e) {

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
            var y = height * (2 / 3);

            // console.log('x: ', x);
            // console.log('y: ', y);

            var jqIsOpen = $('._is_open');

            var origDisplayAttribute = jqIsOpen.css('display');
            jqIsOpen.css('display', 'none');

            var underneathElem = document.elementFromPoint(x, y);

            // console.log('underneathElem: ', underneathElem);
            // console.log('$.elementFromPoint: ', $.elementFromPoint(x, y));

            if (origDisplayAttribute) {
                jqIsOpen.css('display', origDisplayAttribute);
            } else {
                jqIsOpen.css('display', 'block');
            }

            var jqCurrent = $(underneathElem).closest('.section');

            var jqNext = jqCurrent.next('.section');

            if (jqCurrent) {

                currentSection = jqCurrent.data('section');

                if (!e.isTrigger && !velocityScroll) {
                    $.history.load('/' + currentSection);
                }

                // window.location.hash = currentSection;

                $('.page-nav a.active').removeClass('active');

                $('.page-nav a[href="/#/' + jqCurrent.data('section') + '"]').addClass('active');

                $('.bar--next, .pagination__item').removeClass('active');

                $('.pagination__item').eq(jqCurrent.index()).addClass('active');
            }

            if (jqNext) {
                $('.bar--next.bar--' + jqNext.data('section')).addClass('active');
            }

        }, 1);

    };

    // Window resize handler
    var onResize = function(e) {

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

            var jqModal = $('.modal--interstitial');

            jqModal.find('a.button--ok').prop('href', link.source);

            jqModal.velocity('fadeIn', {
                duration: 250
            });
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
        gestures: gestures,
        mediaQueries: mediaQueries,
        currentSection: currentSection
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

        $(document.body)

        .on(BED.UI.gestures.click + '.slideout', 'a[data-slideout]', function(e) {
            toggle($(this).data('slideout'));
        })

        .on(BED.UI.gestures.click + '.slideout', '.slideout', function(e) {
            close($(this));
        })

        .on(BED.UI.gestures.click + '.slideout', '.slideout .close', function(e) {
            close($(this).closest('.slideout'));
        })

        .on(BED.UI.gestures.click + '.slideout', '.slideout .slideout__inner', function(e) {
            e.stopPropagation();
        })

        .on(BED.UI.gestures.click + '.slideout', '.page-nav a', function(e) {
            close($('.slideout--menu'));
        });
    };

    var open = function(el) {

        $('.slideout._is_open').exists(function() {
            close($(this));
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

    };

    var close = function(el) {

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
            'data-center': 'opacity: 1; transform: translate3d(0px,0,0px)'
        },
        'prevalence-female-graphic': {
            'data-bottom-top': 'opacity: 0; transform: translate3d(-500px,0px,0px)',
            'data-center': 'opacity: 1; transform: translate3d(0px,0,0px)'
        },
        'prevalence-blurb-2': {
            'data-bottom-top': 'opacity: 0; transform: translate3d(0px,100px,0px)',
            'data-center': 'opacity: 1; transform: translate3d(0px,0,0px)'
        },

        //Prevalence Patients
        'patient-1': {
            'data-bottom-top': 'transform: translate3d(-800px,0px,0px);',
            'data--40p-bottom': 'transform: translate3d(0px,0px,0px);'
        },
        'patient-2': {
            'data-bottom-top': 'transform: translate3d(-800px,0px,0px);',
            'data--30p-bottom': 'transform: translate3d(0px,0px,0px);'
        },
        'patient-3': {
            'data-bottom-top': 'transform: translate3d(-800px,0px,0px);',
            'data--20p-bottom': 'transform: translate3d(0px,0px,0px);'
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
            'data--10p-bottom': 'transform: translate3d(732px,0px,0px)',
            'data--25p-bottom': 'transform: translate3d(0px,0px,0px)'
        },
        'course-21-copy': {
            'data--20p-bottom': 'opacity: 0; transform: scale(0);',
            'data--35p-bottom': 'opacity: 1; transform: scale(1);'
        },
        'course-80': {
            'data-bottom-top': 'opacity: 0; transform: scale(0.5);',
            'data-center': 'opacity: 1; transform: scale(1);'
        },
        'course-49': {
            'data-bottom-top': 'opacity: 0; transform: scale(0.5);',
            'data-center': 'opacity: 1; transform: scale(1);'
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

    var locations = {
        'grilo2': '//view.vzaar.com/1788413/video',
        'bulik3': '//view.vzaar.com/1788415/video',
        'bulik4': '//view.vzaar.com/1788416/video',
        'grilo5': '//view.vzaar.com/1788417/video',
        'kornstein6': '//view.vzaar.com/1788418/video',
        'grilo7': '//view.vzaar.com/1788419/video',
        'kornstein8': '//view.vzaar.com/1788420/video',
        'bulik12': '//view.vzaar.com/1788421/video',
        'kornstein14': '//view.vzaar.com/1788422/video'
    };

    var videoNameList = [];
    var videoTitleList = [];

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
            videoTitleList.push($(el).find('p').text().trim().slice(0, -8));

            // Load first video in list
            if (i === 0) {
                currentVideoName = videoNameList[i];
                currentVideoTitle = videoTitleList[i];
                $('#videoPlayer source').attr('src', document.location.protocol + locations[currentVideoName]);
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

            success: onSuccess,

            error: onError

        });

        // Setup UI Events

        $(document.body)

        .on(BED.UI.gestures.click + '.videoplayer', '.video-playlist li[data-video]', function(e) {

            playVideo($(this).data('video'));

        })

        .on(BED.UI.gestures.click + '.videoplayer', '.video-player .arrow-left', function(e) {

            playPrevVideo();

        })

        .on(BED.UI.gestures.click + '.videoplayer', '.video-player .arrow-right', function(e) {

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

        console.log('currentPercentage: ', currentPercentage);

        if (currentPercentage >= 0 && !p0) {
            // Check if more than 0% viewed and if not previously fired

            console.log('0%');

            p0 = true;

            // fire 'Video Play'
            BED.Analytics.videoOnPlay(currentVideoTitle);

        } else if (currentPercentage >= 25 && !p25) {
            // Check if more than 25% viewed and if not previously fired

            console.log('25%');

            p25 = true;

            // fire 'Video Milestone' @ 25%
            BED.Analytics.videoOnPercentage(currentVideoTitle, 25);

        } else if (currentPercentage >= 50 && !p50) {
            // Check if more than 50% viewed and if not previously fired

            console.log('50%');

            p50 = true;

            // fire 'Video Milestone' @ 50%
            BED.Analytics.videoOnPercentage(currentVideoTitle, 50);

        } else if (currentPercentage >= 75 && !p75) {
            // Check if more than 75% viewed and if not previously fired

            console.log('75%');

            p75 = true;

            // fire 'Video Milestone' @ 75%
            BED.Analytics.videoOnPercentage(currentVideoTitle, 75);

        } else if (currentPercentage >= 90 && !p90) {
            // Check if more than 90% viewed and if not previously fired

            console.log('90%');

            p90 = true;

            // fire 'Video Complete'
            BED.Analytics.videoOnComplete(currentVideoTitle);

        } else if (currentPercentage >= 99 && !p100) {
            // Check if more than 100% viewed and if not previously fired

            console.log('100%');

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
        currentVideoTitle = videoTitleList[_.indexOf(videoNameList, name)];

        // Scroll player into view
        $('.mejs-container').velocity('scroll', {
            duration: 250,
            offset: '-' + ($('.page-header').height() + 20)
        });

        // Load video
        instance.setSrc(document.location.protocol + locations[currentVideoName]);

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
        init: init
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

    // Return the module object
    return {
        init: init,
        videoOnPlay: videoOnPlay,
        videoOnPercentage: videoOnPercentage,
        videoOnComplete: videoOnComplete
    };

})();

//# sourceMappingURL=bed.js.map