if (typeof BED === 'undefined') {
    window.BED = {};
}

//var homeVideoPlayer;

BED.HomeVideoPlayer = (function() {


    /* ----------- Variables -----------*/
    
    var initialized = false;

    var init = function() {

        if (initialized) {
            return;
        }

        initialized = true;

        var heroVideos = [
            '//view.vzaar.com/2552732/video',
            '//view.vzaar.com/2552735/video',
            '//view.vzaar.com/2552736/video',
            '//view.vzaar.com/2552737/video'
        ];


        /* ----------- Video Index Cookie - getter/setter -----------*/

        // set which home video will be played based on its index
        function setVideoCookie(index) {
            document.cookie = 'videoIndex  = ' + index;
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

                    // flash url : controls=false&file=//view.vzaar.com/2552732/video

                    // Load video?
                    mediaElement.load();

                    mediaElement.setVolume(0);

                    mediaElement.play();

                    player = mediaElement;
                },
                error: function () {
                    console.log('The video did not load properly.');
                }
            });

            return player;
        }

        // play the video at the desired index
        function playHomeVideo(index) {

            var homeVideoPlayer;

            //console.log('desktop: ' + window.matchMedia(BED.UI.mediaQueries.desktop).matches);

            // only play the video in desktop view - video is hidden otherwise
            if (window.matchMedia(BED.UI.mediaQueries.desktop).matches || $('html').hasClass('eq-ie')) {

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


                // homeVideoPlayer.setSrc(document.location.protocol + heroVideos[index-1]);

                // homeVideoPlayer.load();
                // homeVideoPlayer.setVolume(0);
                // homeVideoPlayer.play();


            } else {

                $('.section--home').addClass('mobile-bg mobile-bg-' + index);
            }

            $('.section--home .content-wrap').addClass('active');
        }

        /* ----------- Init -----------*/
        

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

        $('#heroPlayer').on('ended', function() {
            //console.log('alksjdflsdaf ');
            $(this).fadeOut(500);
        })

        $('#heroPlayer').ready(function() {

            // hide homepage video if tablet or mobile
            if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            
                // console.log('mobile/tablet');
                $('#heroPlayer').hide();
            }
        });
    };

    // Return the module object
    return {
        init: init,
        instance: function() {
            return instance;
        }
    };

})();
