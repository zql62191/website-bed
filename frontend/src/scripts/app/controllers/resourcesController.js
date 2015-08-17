(function() {
    'use strict';

    angular.module('cdmp.controllers')

    .controller('ResourcesController', ['$scope', '$rootScope', '$window', '$document', '$timeout', '_', 'parseUri',
        function($scope, $rootScope, $window, $document, $timeout, _, parseUri){

            //local variables & functions!
            var activehost = "localhost:3000";

            $scope.tabbedVideos = [{
                tabclass : "what-is-bed",
                tabtitle: "What Is B.E.D.?",
                disclaimer: "Drs Bulik and Wilfley are paid consultants for Shire.",
                videos : [
                    {
                        id: "essential-features-diag",
                        title: "What are the essential features for a diagnosis of B.E.D.?",
                        length: "1:25",
                        featuring: "Cynthia M. Bulik, PhD, FAED",
                        filepath: "//d2ly9zedmmzqz4.cloudfront.net/BED-S03323.mp4",
                        host: activehost,
                        newFrom: null,
                        viewed: true
                    },
                    {
                        id: "bed-diff-bulimia",
                        title: "How is B.E.D. distinct from bulimia nervosa?",
                        length: "2:23",
                        featuring: "Denise E. Wilfley, PhD",
                        filepath: "//d2ly9zedmmzqz4.cloudfront.net/BED-S03014.mp4",
                        host: activehost,
                        newFrom: Date(2015, 7, 15),
                        viewed: false
                    },
                    {
                        id: "bed-diff-overeating",
                        title: "How is B.E.D. distinct from overeating and obesity?",
                        length: "2:31",
                        featuring: "Denise E. Wilfley, PhD",
                        filepath: "//d2ly9zedmmzqz4.cloudfront.net/BED-S03013.mp4",
                        host: activehost,
                        newFrom: Date(2015, 7, 15),
                        viewed: false
                    },
                    {
                        id: "functional-conseqs",
                        title: "What are the functional consequences of B.E.D. in adults?",
                        length: "2:00",
                        featuring: "Cynthia M. Bulik, PhD, FAED",
                        filepath: "//d2ly9zedmmzqz4.cloudfront.net/BED-S03322.mp4",
                        host: activehost,
                        newFrom: null,
                        viewed: true
                    },
                    {
                        id: "clinical-course",
                        title: "What is the clinical course of B.E.D.?",
                        length: "0:31",
                        featuring: "Cynthia M. Bulik, PhD, FAED",
                        filepath: "//d2ly9zedmmzqz4.cloudfront.net/BED-S03016.mp4",
                        host: activehost,
                        newFrom: Date(2015, 7, 15),
                        viewed: false
                    }
                ]
            },{
                tabclass: "in-adults",
                tabtitle: "B.E.D. in Adults",
                disclaimer: "Drs Grilo, Kornstein, and Wilfley are paid consultants for Shire.",
                videos: [
                    {
                        id: "prevalence-comparison",
                        title: "How does the prevalence of B.E.D. compare to that of other eating disorders in adults?",
                        length: "0:42",
                        featuring: "Carlos Grilo, PhD",
                        filepath: "//d2ly9zedmmzqz4.cloudfront.net/BED-S02969.mp4",
                        host: activehost,
                        newFrom: null,
                        viewed: true
                    },
                    {
                        id: "rel-obesity-bed",
                        title: "What is the relationship between obesity and B.E.D. in adults?",
                        length: "0:55",
                        featuring: "Denise E. Wilfley, PhD",
                        filepath: "//d2ly9zedmmzqz4.cloudfront.net/BED-S03017.mp4",
                        host: activehost,
                        newFrom: Date(2015, 7, 15),
                        viewed: false
                    },
                    {
                        id: "psych-conditions-assoc",
                        title: "What psychiatric conditions are commonly associated with B.E.D.?",
                        length: "1:10",
                        featuring: "Carlos Grilo, PhD",
                        filepath: "//d2ly9zedmmzqz4.cloudfront.net/BED-S02972.mp4",
                        host: activehost,
                        newFrom: null,
                        viewed: false
                    },
                    {
                        id: "thought-to-cause",
                        title: "What is thought to cause B.E.D.?",
                        length: "0:53",
                        featuring: "Susan G. Kornstein, MD",
                        filepath: "//d2ly9zedmmzqz4.cloudfront.net/BED-S02973.mp4",
                        host: activehost,
                        newFrom: null,
                        viewed: true
                    },
                    {
                        id: "prevalence-comparison-ethnic",
                        title: "How does the prevalence of B.E.D. compare among races/ethnicities in adults?",
                        length: "0:52",
                        featuring: "Carlos Grilo, PhD",
                        filepath: "//d2ly9zedmmzqz4.cloudfront.net/BED-S03011.mp4",
                        host: activehost,
                        newFrom: null,
                        viewed: false
                    },
                    {
                        id: "occur-in-both",
                        title: "Does B.E.D. occur in both women and men?",
                        length: "0:34",
                        featuring: "Susan G. Kornstein, MD",
                        filepath: "//d2ly9zedmmzqz4.cloudfront.net/BED-S03012.mp4",
                        host: activehost,
                        newFrom: null,
                        viewed: true
                    },
                    {
                        id: "begin-effective-convo",
                        title: "How can clinicians begin an effective conversation with their adult patients about B.E.D.?",
                        length: "0:51",
                        featuring: "Susan G. Kornstein, MD",
                        filepath: "//d2ly9zedmmzqz4.cloudfront.net/BED-S03018.mp4",
                        host: activehost,
                        newFrom: Date(2015, 7, 15),
                        viewed: false
                    }
                ]
            }, {
                tabclass: "experts",
                tabtitle: "Experts Panel Discussion",
                videos: [
                    {
                        id: "living-with-bed",
                        title: "Living with B.E.D.",
                        length: "1:25",
                        featuring: "",
                        filepath: "//d2ly9zedmmzqz4.cloudfront.net/BED-S02868.mp4",
                        host: activehost,
                        newFrom: Date(2015, 7, 15),
                        viewed: true
                    },
                    {
                        id: "diag-criteria",
                        title: "Diagnostic criteria for B.E.D.",
                        length: "5:56",
                        featuring: "",
                        filepath: "//d2ly9zedmmzqz4.cloudfront.net/BED-S03499.mp4",
                        host: activehost,
                        newFrom: null,
                        viewed: false
                    },
                    {
                        id: "possible-causes-of-bed",
                        title: "Possible causes of B.E.D.",
                        length: "5:37",
                        featuring: "",
                        filepath: "//d2ly9zedmmzqz4.cloudfront.net/BED-S03500.mp4",
                        host: activehost,
                        newFrom: null,
                        viewed: false
                    },
                    {
                        id: "recog-adult-patients",
                        title: "Recognizing adult patients with B.E.D.",
                        length: "6:21",
                        featuring: "",
                        filepath: "//d2ly9zedmmzqz4.cloudfront.net/BED-S03501.mp4",
                        host: activehost,
                        newFrom: null,
                        viewed: false
                    },
                    {
                        id: "functional-conseqs2",
                        title: "Functional consequences of B.E.D. ",
                        length: "2:24",
                        featuring: "",
                        filepath: "//d2ly9zedmmzqz4.cloudfront.net/BED-S03502.mp4",
                        host: activehost,
                        newFrom: null,
                        viewed: true
                    },
                    {
                        id: "diag-bed-in-adult-patients",
                        title: "Diagnosing B.E.D. in adult patients",
                        length: "4:06",
                        featuring: "",
                        filepath: "//d2ly9zedmmzqz4.cloudfront.net/BED-S03503.mp4",
                        host: activehost,
                        newFrom: null,
                        viewed: false
                    }
                ]
            }];

            //defaults on page load
            $scope.currentTab = "what-is-bed";
            $scope.currentVideo = "essential-features-diag";
            $scope.defaultVideoPath = '//d2ly9zedmmzqz4.cloudfront.net/BED-S03323.mp4'; // default video - never changes

            // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
            // MEDIA ELEMENTS INTERNAL STUFFS: 

            // flags for video completion percentages:
            var p0      = false;
            var p25     = false;
            var p50     = false;
            var p75     = false;
            var p90     = false;
            var p100    = false;

            // this is the variable that will hold the mejs object
            var instance = null;

            // MediaElementJS success handler
            var onSuccess = function(me, domObject) {

                me.pause();
                instance = me;

                $(instance).on('loadeddata', onLoadedData).on('timeupdate', onTimeUpdate).on('ended', onEnded);     // Setup player listeners

                $('.mejs-container.svg').removeClass('svg').addClass('no-svg');

                instance.setSrc(document.location.protocol + $scope.defaultVideoPath);
                instance.load();
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


            $(document).ready(function(){ 
                //for some odd loading ordering reason, this was throwing a 'nodeName' undefined TypeError, JM
                // Create MEJS object for the video player element 😻

                $('#videoPlayer').mediaelementplayer({
                    pauseOtherPlayers: false,           // allow multiple videos
                    iPadUseNativeControls: true,        // force iPad's native controls
                    iPhoneUseNativeControls: true,      // force iPhone's native controls
                    AndroidUseNativeControls: true,     // force Android's native controls
                    success: onSuccess,
                    error: onError
                });

                // firefox needed a source!
                $("#videoPlayer source").prop('src',document.location.protocol + $scope.defaultVideoPath);

            });
            
            // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



            // returns the video file path based on the id string
            $scope.getVideoPath = function(id) {
                
                for (var i = 0; i < $scope.tabbedVideos.length; i++) {              // iterate through the json objects in array which represent each tab of videos

                    if ($scope.tabbedVideos[i].tabclass === $scope.currentTab) {    // when correct tab is found

                        $scope.currentTabVideos = $scope.tabbedVideos[i].videos;    // save the tab's list of videos

                        for (var j = 0; j < $scope.currentTabVideos.length; j++) {  // iterate through that list of videos

                            if ($scope.currentTabVideos[j]['id'] === id) {          // get filepath from that list

                                return $scope.currentTabVideos[j].filepath;   
                            }
                        }
                    }
                }

                return $scope.defaultVideoPath; // if nothing is found by this point set to default  (╯°□°）╯︵ ┻━┻
            };

            // called from ng-clicks to change video being played
            $scope.updateVideo = function(vid){

                instance.pause();

                $scope.currentVideo = vid;

                var filePath = $scope.getVideoPath(vid);   // get video url

                instance.setSrc(document.location.protocol + filePath); // set mejs to that url
                instance.play();
            };

            $scope.changeTab = function(tabIndex){

                //find out the class of the tab the user selected, using index-1 (1: 0, 2:1, 3:2)
                    var i = tabIndex - 1;
                    
                //bad input, brah
                    if(typeof i === undefined || i < 0 || i > 3){
                        return;
                    }

                //add the active class to the tab on the page to toggle display of the videos in the tab
                    // var tab = angular.element(".tab." + $scope.tabbedVideos[i].tabclass);
                    //is this redundant bc idk about AngularJS?

                //update the scope vars
                    $scope.currentTab = $scope.tabbedVideos[i].tabclass;

                //any other DOM updates that need to be reflected on the page


            };

            $scope.mdOpen = false;

            $scope.toggleMobileDropdown = function() {
                $scope.mdOpen = !$scope.mdOpen;
            };

            $scope.changeTabMobile = function(tabIndex, event) {

                if ($scope.mdOpen) {
                    event.stopPropagation();

                    $scope.changeTab(tabIndex);

                    $scope.mdOpen = false;
                }
            };

            // $scope.updateVideo("video_id");
        }
    ]);

}).call(this);
