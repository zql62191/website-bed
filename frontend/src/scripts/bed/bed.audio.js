if (typeof BED === 'undefined') {
    window.BED = {};
}


BED.AudioPlayer = (function() {


    /* ----------- Variables -----------*/

    var initialized = false;

    var onAudioSuccess = function(me, domObject) {
        //console.log(me + '\n' + domObject);

        me.load();

        if ($(me).hasClass('audio-sample1')) {

            $('.play-sample1').click( function() {
                var target = $(this).data('target');
                me.play();

                console.log('play sample 1');
            });
            
        } else if ($(me).hasClass('audio-sample2')) {

            $('.play-sample2').click( function() {
                var target = $(this).data('target');
                me.play();

                console.log('play sample 2');
            });
        }
    };

    var init = function() {

        if (initialized) {
            return;
        }

        initialized = true;

        function initAudio() {
            if (window.matchMedia(BED.UI.mediaQueries.desktop).matches) {   // desktop

                $('.audio-sample1').mediaelementplayer({
                    audioWidth: 229,
                    pauseOtherPlayers: true,
                    features: ['playpause', 'current', 'progress', 'duration'],
                    success: onAudioSuccess
                });

                $('.audio-sample2').mediaelementplayer({
                    audioWidth: 229,
                    pauseOtherPlayers: true,
                    features: ['playpause', 'current', 'progress', 'duration'],
                    success: onAudioSuccess
                });

            } else {    // mobile

                $('.audio-sample1').mediaelementplayer({
                    audioWidth: 509,
                    audioHeight: 60,
                    pauseOtherPlayers: true,
                    iPadUseNativeControls: false,
                    iPhoneUseNativeControls: false,
                    AndroidUseNativeControls: false,
                    features: ['playpause', 'current', 'progress', 'duration'],
                    success: onAudioSuccess
                });

                $('.audio-sample2').mediaelementplayer({
                    audioWidth: 509,
                    audioHeight: 60,
                    pauseOtherPlayers: true,
                    iPadUseNativeControls: false,
                    iPhoneUseNativeControls: false,
                    AndroidUseNativeControls: false,
                    features: ['playpause', 'current', 'progress', 'duration'],
                    success: onAudioSuccess
                });
            }
        }

        initAudio();
    };

    // Return the module object
    return {
        init: init,
        instance: function() {
            return instance;
        }
    };

})();
