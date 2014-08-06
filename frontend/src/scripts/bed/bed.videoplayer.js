if (typeof BED === 'undefined') {
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
        init: init,
        instance: function() {
            return instance;
        }
    };

})();