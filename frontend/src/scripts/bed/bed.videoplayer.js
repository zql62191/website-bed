if (typeof BED === 'undefined') {
    window.BED = {};
}

// var homeVideoPlayer;

BED.VideoPlayer = (function() {

    var videoLocationList = {
        'grilo2': '//d2ly9zedmmzqz4.cloudfront.net/BED-S02969.mp4', // S02969 Grilo2
        'kornstein8': '//d2ly9zedmmzqz4.cloudfront.net/BED-S03012.mp4', // S03012 Kornstein8
        'grilo7': '//d2ly9zedmmzqz4.cloudfront.net/BED-S03011.mp4', // S03011 Grilo7
        'bulik12': '//d2ly9zedmmzqz4.cloudfront.net/BED-S03016.mp4', // S03016 Bulik12
        'grilo5': '//d2ly9zedmmzqz4.cloudfront.net/BED-S02972.mp4', // S02972 Grilo5
        'kornstein6': '//d2ly9zedmmzqz4.cloudfront.net/BED-S02973.mp4', // S02973 Kornstein6
        'kornstein14': '//d2ly9zedmmzqz4.cloudfront.net/BED-S03018.mp4', // S03018 Kornstein14

        // videos added 10/27/14
        'bulik4': '//d2ly9zedmmzqz4.cloudfront.net/BED-S03323.mp4', // S03323
        'bulik3': '//d2ly9zedmmzqz4.cloudfront.net/BED-S03322.mp4', // S03322
        'wilfley10': '//d2ly9zedmmzqz4.cloudfront.net/BED-S03014.mp4', // S03014
        'wilfley9': '//d2ly9zedmmzqz4.cloudfront.net/BED-S03013.mp4', // S03013
        'wilfley13': '//d2ly9zedmmzqz4.cloudfront.net/BED-S03017.mp4', // S03017

        // BED 2.0 physician television network videos
        'chapter1': '//d2ly9zedmmzqz4.cloudfront.net/BED-S02868.mp4', // S02868 Chapter 1
        'chapter2': '//d2ly9zedmmzqz4.cloudfront.net/BED-S03499.mp4', // S03499 Chapter 2
        'chapter3': '//d2ly9zedmmzqz4.cloudfront.net/BED-S03500.mp4', // S03500 Chapter 3
        'chapter4': '//d2ly9zedmmzqz4.cloudfront.net/BED-S03501.mp4', // S03501 Chapter 4
        'chapter5': '//d2ly9zedmmzqz4.cloudfront.net/BED-S03502.mp4', // S03502 Chapter 5
        'chapter6': '//d2ly9zedmmzqz4.cloudfront.net/BED-S03503.mp4' // S03503 Chapter 6
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
    };


    var videoNameList = [];

    var currentVideoName = 'bulik4'; // this is the first video in the player

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

        /* ----------- Variables -----------*/



        /* ----------- Init -----------*/



        // Generate playlist order list (used in next/prev functionality)
        $('.video-thumb').each(function(i, el) {

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
            pauseOtherPlayers: false, // allow multiple videos
            iPadUseNativeControls: true, // force iPad's native controls
            iPhoneUseNativeControls: true, // force iPhone's native controls
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

        // console.log('instance: ' + instance);

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
