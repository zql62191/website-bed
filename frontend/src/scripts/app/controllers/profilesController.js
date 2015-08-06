(function() {
    'use strict';

    angular.module('cdmp.controllers')

    .controller('ProfilesController', ['$scope', '$rootScope', '$window', '$document', '$timeout', '_', 'parseUri',
        function($scope, $rootScope, $window, $document, $timeout, _, parseUri){

            $scope.slides = ["kimberly","nikki","julie","diego"];

            var currentSlide = parseUri($window.location.href).anchor, slides = $scope.slides;

            

            // console.log("is \t" + currentSlide + " in slides?\t" + (_.indexOf(slides, currentSlide) >= 0) );

            if(currentSlide.length === 0 || _.indexOf(slides, currentSlide) === -1  ){
                currentSlide = "kimberly";
                $scope.currentSlide = "kimberly";
            }else{
                $scope.currentSlide = currentSlide;
            }


            $scope.updateGradient = function(scope){
                var elem = angular.element('#gradient-transition-bottom');

                elem.removeClass();

                elem.addClass($scope.currentSlide);

                // console.log("updating the gradient!");

            };


            //show the currently chosen hero
            $scope.changeHero = function(chosen){

                //don't change if you're switching to the active one
                if(chosen === $scope.currentSlide){
                    return;
                }

                //TODO: Add slide animation!!!

                //change the active hero
                if(_.indexOf(slides, chosen) !== -1){
                    $scope.currentSlide = chosen;
                }


                //change the gradient
                $scope.updateGradient($scope);

                //update the pagination
                $scope.updatePagination($scope);

                // console.log("current slide is\t" + $scope.currentSlide);

            };

            $scope.swipeControls = function(direction) {

                // this is so swipes only happen on tablet/mobile
                if ($(window).width() < 1024) {
                    $scope.clickControls(direction);
                }
            }

            $scope.clickControls = function(direction){

                //i = the current array index
                var i = _.indexOf(slides,$scope.currentSlide), targetI;

                // console.log("received a click!!! we have " + slides.length + " slides and are currently on # " + i);

                if(i === 0 && direction === 'L'){
                    targetI = slides.length-1;
                }else{

                    if(i === slides.length-1 && direction === 'R'){
                        targetI = 0;
                    }else{
                        if(direction === 'L'){
                            targetI = (i-1);
                        }else{
                            targetI = (i+1);
                        }
                    }

                }

                $scope.changeHero(slides[targetI]);

            };

            $scope.updatePagination = function(scope){

                //clear the old ones first
                var rm = angular.element('ul.pagination li, ul.mobile-pagination li').removeClass('active');

                //update with current slide
                var elem = angular.element('ul.pagination li.' + scope.currentSlide + ', ul.mobile-pagination li.' + scope.currentSlide).addClass('active');

            };


            $scope.updateGradient($scope);
            $scope.updatePagination($scope);

        }
    ]);

}).call(this);
