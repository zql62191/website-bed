(function() {
    'use strict';

    angular.module('cdmp.controllers')

    .controller('AudioController', ['$scope', '$rootScope', '$window', '$document', '$timeout', '_', 'parseUri',
        function($scope, $rootScope, $window, $document, $timeout, _, parseUri){

            $scope.defaultPath = "foo.mp3"; // CHANGE ME

            // this is the variable that will hold the mejs object
            var instance = null;

            // MEDIA ELEMENTS INTERNAL STUFFS: 

            // flags for video completion percentages:
            var p0      = false;
            var p25     = false;
            var p50     = false;
            var p75     = false;
            var p90     = false;
            var p100    = false;

            // MediaElementJS success handler
            var onSuccess = function(me, domObject) {

                me.pause();
                instance = me;

                $(instance).on('loadeddata', onLoadedData).on('timeupdate', onTimeUpdate).on('ended', onEnded);     // Setup player listeners

                $('.mejs-container.svg').removeClass('svg').addClass('no-svg');

                // instance.setSrc(document.location.protocol + $scope.defaultVideoPath);
                // instance.load();
            };

            var onError = function() { console.log('ERROR: mejs failed to load'); };

            // MediaElementJS loadeddata handler
            var onLoadedData = function(e) {

                p0 = p25 = p50 = p75 = p90 = p100 = false;  // Reset percentage milestones
            };

            // MediaElementJS timeupdate handler

            // i've copied all the code from bed 2.0 for analytics. 
            // we'll need to copy over some more functions (i think) to actually enable the functionality when the time comes
            var onTimeUpdate = function(e) {

                // Calculate current percentage viewed
                var currentPercentage = (instance.currentTime / instance.duration) * 100;

                if (currentPercentage === 0) {
                    return; // hits 0 percentage after video ended
                }

                if (currentPercentage >= 0 && !p0) {
                    // Check if more than 0% viewed and if not previously fired

                    p0 = true;
                    // BED.Analytics.videoOnPlay(currentVideoTitle);   // fire 'Video Play'

                } else if (currentPercentage >= 25 && !p25) {
                    // Check if more than 25% viewed and if not previously fired

                    p25 = true;
                    // BED.Analytics.videoOnPercentage(currentVideoTitle, 25); // fire 'Video Milestone' @ 25%

                } else if (currentPercentage >= 50 && !p50) {
                    // Check if more than 50% viewed and if not previously fired

                    p50 = true;
                    // BED.Analytics.videoOnPercentage(currentVideoTitle, 50);

                } else if (currentPercentage >= 75 && !p75) {
                    // Check if more than 75% viewed and if not previously fired

                    p75 = true;
                    // BED.Analytics.videoOnPercentage(currentVideoTitle, 75);

                } else if (currentPercentage >= 90 && !p90) {
                    // Check if more than 90% viewed and if not previously fired

                    p90 = true;
                    // BED.Analytics.videoOnComplete(currentVideoTitle);

                } else if (currentPercentage >= 99 && !p100) {
                    // Check if more than 100% viewed and if not previously fired

                    p100 = true;
                    // BED.Analytics.videoOnPercentage(currentVideoTitle, 100);
                }
            };

            // MediaElementJS ended handler
            var onEnded = function(e) {
                p0 = p25 = p50 = p75 = p90 = p100 = false;  // Reset percentage milestones
            };


            // Create MEJS object for the video player element 😻
            $('.audio-player').mediaelementplayer({
                pauseOtherPlayers: true,           // allow multiple videos
                iPadUseNativeControls: true,        // force iPad's native controls
                iPhoneUseNativeControls: true,      // force iPhone's native controls
                AndroidUseNativeControls: true,     // force Android's native controls
                success: onSuccess,
                error: onError
            });

            // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



            // // returns the video file path based on the id string
            // $scope.getPath = function(id) {
                
            //     $scope.

            //     return $scope.defaultPath; // if nothing is found by this point set to default  (╯°□°）╯︵ ┻━┻
            // };

            // called from ng-clicks to change video being played
            $scope.updateVideo = function(e){

                instance.pause();

                var filePath = e.currentTarget.attribute.src;

                instance.setSrc(document.location.protocol + filePath); // set mejs to that url
                instance.play();
            };

        }
    ]);
}).call(this);
