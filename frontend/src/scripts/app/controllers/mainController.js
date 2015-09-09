(function() {
    'use strict';

    angular.module('cdmp.controllers')

    .controller('MainController', ['$scope', '$rootScope', '$window', '$document', '$timeout', '$http', 'matchmedia', 'ModalService', 'Analytics', '_', 'he', 'parseUri', 'showErrorsConfig',
        function($scope, $rootScope, $window, $document, $timeout, $http, matchmedia, ModalService, Analytics, _, he, parseUri, showErrorsConfig) {


            $rootScope.emailPattern = /^.+@[^\.].*\.[a-zA-Z]{2,}$/;
            $rootScope.passwordPattern = /^(?=^.{6,}$)((?=.*\d)|(?=.*\W+))(?=.*[a-zA-Z]).*$/;
            $rootScope.datePattern = /^\d{2}\/\d{2}\/\d{4}$/;

            // Media Queries and Watchers Logic

            var mediaQueries = {
                // p: '(orientation: portrait)',
                // l: '(orientation: landscape)',
                sm: 'only screen and (max-width: 640px)',
                md: 'only screen and (min-width: 641px) and (max-width: 1024px)',
                lg: 'only screen and (min-width: 1025px)'
            };
            
            // Changed to put it on the rootScope so services can access it too.
            $rootScope.mq = {};
            
            _.each(mediaQueries, function(value, key) {
            
                $rootScope.mq[key] = matchmedia.is(value);
            
                matchmedia.on(value, function(mediaQueryList) {
                    $rootScope.mq[key] = mediaQueryList.matches;
                });
            
            });

            // Fix for the gradient issues of Chrome on Mac  
            if(bowser.chrome && navigator.platform.toUpperCase().indexOf("MAC") > -1){
                angular.element("section,header.header--page").addClass("no-gradient");
            }
            

            $scope.scrollTo = function(sel, dur) {

                // Get the element
                var el = angular.element(sel);

                // Check if the element exists
                if (el.length > 0) {

                    // If it exists, scroll there!
                    $document.scrollToElement(el, $scope.offsetTop, dur || 0);
                }

            };

            // Modal stuff
            $scope.showModal = function(name, controller, scope) {
            
                $rootScope.$emit('close:modal');
            
                ModalService
                    .showModal({
                        // scope: scope || $scope,
                        templateUrl: 'views/modal/' + name + '.html',
                        controller: controller || 'ModalController'
                    })
                    .then(function(modal) {
                        // modal.element.show();
                    });
            };


            // Fix for scrolling to an anchor
            $timeout(function() {

                // .slice(1) removes the slash that angular adds
                $scope.scrollTo('#' + parseUri($window.location.href).anchor.slice(1));

            }, 150);

        }
    ]);

}).call(this);
