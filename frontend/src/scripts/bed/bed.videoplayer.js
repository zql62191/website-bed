if (typeof BED === 'undefined') {
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
