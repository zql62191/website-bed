BED.VideoPlayer = {

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
