var BED = {

    whitelisted: [
        'www.shire.com',
        'shire.com'
    ],

    init: function() {

        BED.UI.init();

        BED.Skrollr.init();

        BED.VideoPlayer.init();

        BED.Analytics.init();

    }

};
;BED.UI = {

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
;BED.UI.SlideOut = {

    init: function() {

        $(document.body)

        .on(BED.UI.gestures.click, 'a[data-slideout]', function(e) {
            BED.UI.SlideOut.toggle($(this).data('slideout'));
        })

        .on(BED.UI.gestures.click, '.slideout', function(e) {
            BED.UI.SlideOut.close($(this));
        })

        .on(BED.UI.gestures.click, '.slideout .close', function(e) {
            BED.UI.SlideOut.close($(this).closest('.slideout'));
        })

        .on(BED.UI.gestures.click, '.slideout .slideout__inner', function(e) {
            e.stopPropagation();
        })

        .on(BED.UI.gestures.click, '.page-nav a', function(e) {

            BED.UI.SlideOut.close($('.slideout--menu'));

        });

    },

    open: function(el) {

        $('.slideout._is_open').exists(function() {
            BED.UI.SlideOut.close($(this));
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
            BED.UI.SlideOut.close(jqSlideOut);
        } else {
            BED.UI.SlideOut.open(jqSlideOut);
        }

    }
};
;BED.Skrollr = {

    animations: {

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

    },

    instance: null,

    init: function() {

        // Disable on Mobile/Tablet/IE
        if (!bowser.mobile && !bowser.tablet && !bowser.msie) {

            // Setup skrollr animation attributes
            $('[data-skrollr]').each(function(i, el) {

                var name = $(el).data('skrollr');

                var attrs = BED.Skrollr.animations[name];

                if (attrs) {
                    $(el).attr(attrs);
                }

            });

            // Initialize skrollr
            BED.Skrollr.instance = skrollr.init({
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

    }
};
;BED.VideoPlayer = {

    locations: {
        'grilo2': '//view.vzaar.com/1788413/video',
        'bulik3': '//view.vzaar.com/1788415/video',
        'bulik4': '//view.vzaar.com/1788416/video',
        'grilo5': '//view.vzaar.com/1788417/video',
        'kornstein6': '//view.vzaar.com/1788418/video',
        'grilo7': '//view.vzaar.com/1788419/video',
        'kornstein8': '//view.vzaar.com/1788420/video',
        'bulik12': '//view.vzaar.com/1788421/video',
        'kornstein14': '//view.vzaar.com/1788422/video'
    },

    currentVideo: '',

    currentVideoName: '',

    playPercentages: {
        _0: false,
        _25: false,
        _50: false,
        _75: false,
        _90: false,
        _100: false
    },

    instance: null,

    init: function() {

        $('#videoPlayer').attr({

            width: window.matchMedia(BED.UI.mediaQueries.mobile).matches ? 560 : 800,

            height: window.matchMedia(BED.UI.mediaQueries.mobile).matches ? 315 : 450

        }).mediaelementplayer({

            success: BED.VideoPlayer.onSuccess,

            error: BED.VideoPlayer.onError

        });

        $(document.body)

        .on(BED.UI.gestures.click, '.video-playlist li[data-video]', function(e) {

            $(this).siblings().removeClass('active').end().addClass('active');

            $('.mejs-container').velocity('scroll', {
                duration: 250,
                offset: '-' + ($('.page-header').height() + 20)
            });

            BED.VideoPlayer.currentVideo = $(this).data('video');

            BED.VideoPlayer.currentVideoName = $(this).find('p').text().slice(0, -8);

            BED.VideoPlayer.instance.setSrc(BED.VideoPlayer.locations[BED.VideoPlayer.currentVideo]);

            BED.VideoPlayer.instance.play();

        })

        .on(BED.UI.gestures.click, '.video-player .arrow-left', function(e) {

            var jqCurrent = $('.video-playlist li.active');

            if (jqCurrent.is(':first-child')) {
                jqCurrent.siblings('li[data-video]').last().trigger(BED.UI.gestures.click);
            } else {
                jqCurrent.prev('li[data-video]').trigger(BED.UI.gestures.click);
            }

        })

        .on(BED.UI.gestures.click, '.video-player .arrow-right', function(e) {

            var jqCurrent = $('.video-playlist li.active');

            if (jqCurrent.is(':last-child')) {
                jqCurrent.siblings('li[data-video]').first().trigger(BED.UI.gestures.click);
            } else {
                jqCurrent.next('li[data-video]').trigger(BED.UI.gestures.click);
            }

        });

        var activeVideo = $('li[data-video].active');

        BED.VideoPlayer.currentVideo = activeVideo.data('video');

        BED.VideoPlayer.currentVideoName = activeVideo.find('p').text().slice(0, -8);

    },

    onSuccess: function(mediaElement, domObject) {

        BED.VideoPlayer.instance = mediaElement;

        // Setup listeners
        $(BED.VideoPlayer.instance)

        .on('loadeddata', BED.VideoPlayer.onLoadedData)

        .on('timeupdate', BED.VideoPlayer.onTimeUpdate)

        .on('ended', BED.VideoPlayer.onEnded);

    },

    onError: function() {
        // console.log('error');
    },

    onLoadedData: function(e) {
        // console.log(e);

        // Reset percentage milestones
        BED.VideoPlayer.playPercentages._0 = false;
        BED.VideoPlayer.playPercentages._25 = false;
        BED.VideoPlayer.playPercentages._50 = false;
        BED.VideoPlayer.playPercentages._75 = false;
        BED.VideoPlayer.playPercentages._90 = false;
        BED.VideoPlayer.playPercentages._100 = false;
    },

    onTimeUpdate: function(e) {
        // console.log(e);

        // Calculate current percentage viewed
        var currentPercentage = (BED.VideoPlayer.instance.currentTime / BED.VideoPlayer.instance.duration) * 100;

        if (currentPercentage === 0) {
            // hits 0 percentage after video ended
            return;
        }

        // console.log('currentPercentage: ', currentPercentage);

        if (currentPercentage >= 0 && !BED.VideoPlayer.playPercentages._0) {
            // Check if more than 0% viewed and if not previously fired

            console.log('0%');

            BED.VideoPlayer.playPercentages._0 = true;

            // fire 'Video Play'
            BED.Analytics.videoOnPlay(BED.VideoPlayer.currentVideoName);

        } else if (currentPercentage >= 25 && !BED.VideoPlayer.playPercentages._25) {
            // Check if more than 25% viewed and if not previously fired

            console.log('25%');

            BED.VideoPlayer.playPercentages._25 = true;

            // fire 'Video Milestone' @ 25%
            BED.Analytics.videoOnPercentage(BED.VideoPlayer.currentVideoName, 25);

        } else if (currentPercentage >= 50 && !BED.VideoPlayer.playPercentages._50) {
            // Check if more than 50% viewed and if not previously fired

            console.log('50%');

            BED.VideoPlayer.playPercentages._50 = true;

            // fire 'Video Milestone' @ 50%
            BED.Analytics.videoOnPercentage(BED.VideoPlayer.currentVideoName, 50);

        } else if (currentPercentage >= 75 && !BED.VideoPlayer.playPercentages._75) {
            // Check if more than 75% viewed and if not previously fired

            console.log('75%');

            BED.VideoPlayer.playPercentages._75 = true;

            // fire 'Video Milestone' @ 75%
            BED.Analytics.videoOnPercentage(BED.VideoPlayer.currentVideoName, 75);

        } else if (currentPercentage >= 90 && !BED.VideoPlayer.playPercentages._90) {
            // Check if more than 90% viewed and if not previously fired

            console.log('90%');

            BED.VideoPlayer.playPercentages._90 = true;

            // fire 'Video Complete'
            BED.Analytics.videoOnComplete(BED.VideoPlayer.currentVideoName);

        } else if (currentPercentage >= 99 && !BED.VideoPlayer.playPercentages._100) {
            // Check if more than 100% viewed and if not previously fired

            console.log('100%');

            BED.VideoPlayer.playPercentages._100 = true;

            // fire 'Video Milestone' @ 100%
            BED.Analytics.videoOnPercentage(BED.VideoPlayer.currentVideoName, 100);

        }
    },

    onEnded: function(e) {
        // console.log(e);

        // Reset percentage milestones
        BED.VideoPlayer.playPercentages._0 = false;
        BED.VideoPlayer.playPercentages._25 = false;
        BED.VideoPlayer.playPercentages._50 = false;
        BED.VideoPlayer.playPercentages._75 = false;
        BED.VideoPlayer.playPercentages._90 = false;
        BED.VideoPlayer.playPercentages._100 = false;
    }

};
;BED.Analytics = {

    init: function() {

    },

    videoOnPlay: function(name) {

        console.log('videoOnPlay fired: ', name);

        if (typeof window.mediaPlayHandler !== 'undefined') {
            window.mediaPlayHandler('Video > ' + name);
        }
    },
    videoOnPercentage: function(name, percentage) {

        console.log('videoOnPercentage fired: ', name, percentage);

        if (typeof window.mediaMilestoneHandler !== 'undefined') {
            window.mediaMilestoneHandler('Video > ' + name, percentage);
        }
    },
    videoOnComplete: function(name) {

        console.log('videoOnComplete fired: ', name);

        if (typeof window.mediaCompleteHandler !== 'undefined') {
            window.mediaCompleteHandler('Video > ' + name);
        }
    }
};
