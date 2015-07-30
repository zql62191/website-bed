(function() {
    'use strict';

    angular.module('cdmp.controllers')

    .controller('ResourcesController', ['$scope', '$rootScope', '$window', '$document', '$timeout', '_', 'parseUri',
        function($scope, $rootScope, $window, $document, $timeout, _, parseUri){

            //local variables & functions!
            var activehost = "localhost:3000";

            var getVideoInfo = function(id, vids){
                var i = _.findIndex(vids, "id", id);
                console.log( "i'm looking for video with id " + id + " and came up with\t" + i );
                return vids[i];
            };

            $scope.tabbedVideos = [{
                tabclass : "what-is-bed",
                tabtitle: "What is B.E.D.?",
                disclaimer: "Drs. Bulik and Wilfley are paid consultants for Shire.",
                videos : [
                    {
                        id: "essential-features-diag",
                        title: "What are the essential features for a diagnosis of B.E.D.?",
                        length: "1:25",
                        featuring: "Cynthia M. Bulik, PhD, FAED",
                        filepath: "assets/supercoolvideo.mp4",
                        host: activehost,
                        newFrom: Date(2015, 7, 15),
                        viewed: true
                    },
                    {
                        id: "bed-diff-bulimia",
                        title: "How is B.E.D. distinct from bulimia nervosa?",
                        length: "2:23",
                        featuring: "Denise E. Wilfley, PhD",
                        filepath: "assets/supercoolvideo.mp4",
                        host: activehost,
                        newFrom: Date(2015, 7, 15),
                        viewed: false
                    },
                    {
                        id: "bed-diff-overeating",
                        title: "How is B.E.D. distinct from overeating and obesity?",
                        length: "2:31",
                        featuring: "Denise E. Wilfley, PhD",
                        filepath: "assets/supercoolvideo.mp4",
                        host: activehost,
                        newFrom: Date(2015, 7, 15),
                        viewed: false
                    },
                    {
                        id: "functional-conseqs",
                        title: "How is B.E.D. distinct from bulimia nervosa?",
                        length: "2:00",
                        featuring: "Cynthia M. Bulik, PhD, FAED",
                        filepath: "assets/supercoolvideo.mp4",
                        host: activehost,
                        newFrom: Date(2015, 7, 15),
                        viewed: true
                    },
                    {
                        id: "clinical-course",
                        title: "What is the clinical course of B.E.D.?",
                        length: "0:31",
                        featuring: "Cynthia M. Bulik, PhD, FAED",
                        filepath: "assets/supercoolvideo.mp4",
                        host: activehost,
                        newFrom: Date(2015, 7, 15),
                        viewed: false
                    }
                ]
            },{
                tabclass: "in-adults",
                tabtitle: "B.E.D. in Adults",
                disclaimer: "Drs. Grilo, Kornstein, and Wilfley are paid consultants for Shire.",
                videos: [
                    {
                        id: "prevalence-comparison",
                        title: "How does the prevalence of B.E.D. compare to that of other eating disorders in adults?",
                        length: "0:42",
                        featuring: "Carlos Grilo, PhD",
                        filepath: "assets/supercoolvideo.mp4",
                        host: activehost,
                        newFrom: Date(2015, 7, 15),
                        viewed: true
                    },
                    {
                        id: "rel-obesity-bed",
                        title: "What is the relationship between obesity and B.E.D. in adults?",
                        length: "0:55",
                        featuring: "Denise E. Wilfley, PhD",
                        filepath: "assets/supercoolvideo.mp4",
                        host: activehost,
                        newFrom: Date(2015, 7, 15),
                        viewed: false
                    },
                    {
                        id: "psych-conditions-assoc",
                        title: "What psychiatric conditions are commonly associated with B.E.D.?",
                        length: "1:10",
                        featuring: "Carlos Grilo, PhD",
                        filepath: "assets/supercoolvideo.mp4",
                        host: activehost,
                        newFrom: Date(2015, 7, 15),
                        viewed: false
                    },
                    {
                        id: "thought-to-cause",
                        title: "What is thought to cause B.E.D.?",
                        length: "0:53",
                        featuring: "Susan G. Kornstein, MD",
                        filepath: "assets/supercoolvideo.mp4",
                        host: activehost,
                        newFrom: Date(2015, 7, 15),
                        viewed: true
                    },
                    {
                        id: "prevalence-comparison-ethnic",
                        title: "How does the prevalence of B.E.D. compare among races/ethnicities in adults?",
                        length: "0:52",
                        featuring: "Carlos Grilo, PhD",
                        filepath: "assets/supercoolvideo.mp4",
                        host: activehost,
                        newFrom: Date(2015, 7, 15),
                        viewed: false
                    },
                    {
                        id: "occur-in-both",
                        title: "Does B.E.D. occur in both women and men?",
                        length: "0:34",
                        featuring: "Susan G. Kornstein, MD",
                        filepath: "assets/supercoolvideo.mp4",
                        host: activehost,
                        newFrom: Date(2015, 7, 15),
                        viewed: true
                    },
                    {
                        id: "begin-effective-convo",
                        title: "How can clinicians begin an effective conversation with their adult patients about B.E.D.?",
                        length: "0:51",
                        featuring: "Susan G. Kornstein, MD",
                        filepath: "assets/supercoolvideo.mp4",
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
                        filepath: "assets/supercoolvideo.mp4",
                        host: activehost,
                        newFrom: Date(2015, 7, 15),
                        viewed: true
                    },
                    {
                        id: "diag-criteria",
                        title: "Diagnostic criteria for B.E.D.",
                        length: "5:56",
                        featuring: "",
                        filepath: "assets/supercoolvideo.mp4",
                        host: activehost,
                        newFrom: Date(2015, 7, 15),
                        viewed: false
                    },
                    {
                        id: "possible-causes-of-bed",
                        title: "Possible causes of B.E.D.",
                        length: "5:37",
                        featuring: "",
                        filepath: "assets/supercoolvideo.mp4",
                        host: activehost,
                        newFrom: Date(2015, 7, 15),
                        viewed: false
                    },
                    {
                        id: "recog-adult-patients",
                        title: "Recognizing adult patients with B.E.D.",
                        length: "6:21",
                        featuring: "",
                        filepath: "assets/supercoolvideo.mp4",
                        host: activehost,
                        newFrom: Date(2015, 7, 15),
                        viewed: false
                    },
                    {
                        id: "functional-conseqs2",
                        title: "Living with B.E.D.",
                        length: "2:24",
                        featuring: "",
                        filepath: "assets/supercoolvideo.mp4",
                        host: activehost,
                        newFrom: Date(2015, 7, 15),
                        viewed: true
                    },
                    {
                        id: "diag-bed-in-adult-patients",
                        title: "Diagnosing B.E.D. in adult patients",
                        length: "4:06",
                        featuring: "",
                        filepath: "assets/supercoolvideo.mp4",
                        host: activehost,
                        newFrom: Date(2015, 7, 15),
                        viewed: false
                    }
                ]
            }];

            //defaults on page load
            $scope.currentVideo = "essential-features-diag";
            $scope.currentTab = "what-is-bed";


            $scope.updateVideo = function(vid){

                //this fn is fired in ng-click of a .box

                $scope.currentVideo = vid;

                var info = getVideoInfo(vid, $scope.tabbedVideos[$scope.currentTab]);

                angular.element(".player h2").text("The current video ID is: " + $scope.currentVideo + " which has this cool info: " + JSON.stringify(info) );

            };

            $scope.changeTab = function(tabIndex){

                //find out the class of the tab the user selected, using index-1 (1: 0, 2:1, 3:2)
                    var i = tabIndex - 1;
                    
                //bad input, brah
                    if(typeof i === undefined || i < 0 || i > 3){
                        return;
                    }

                //add the active class to the tab on the page to toggle display of the videos in the tab
                    var tab = angular.element(".tab." + $scope.tabbedVideos[i].tabclass);
                    //is this redundant bc idk about AngularJS?

                //update the scope vars
                    $scope.currentTab = $scope.tabbedVideos[i].tabclass;

                //any other DOM updates that need to be reflected on the page


            };

            // $scope.updateVideo("video_id");
        }
    ]);

}).call(this);
