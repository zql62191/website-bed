(function() {
    'use strict';

    angular.module('cdmp.directives')

    .directive('heroBullet', ['$rootScope', '$location', 'parseUri', 
        function($rootScope, $location, parseUri){

            //any vars?
            return {
                restrict: 'E',
                link: function(){}
            };

        }
    ])

    .directive('heroCarousel', ['$rootScope', '$location', 'parseUri', 
        function($rootScope, $location, parseUri){

            //any vars?
            return {
                restrict: 'E',
                link: function(){}
            };

        }
    ]);

}).call(this);
