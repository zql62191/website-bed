(function() {
    'use strict';

    angular.module('cdmp.directives')

    .directive('a', ['$rootScope', '$location', 'parseUri', 'ModalService',
        function($rootScope, $location, parseUri, ModalService) {

            var whitelist = [                
                parseUri($location.absUrl()).host,
                $location.$$host
            ];
            var foo = whitelist.join('|');
            var whitelistRegex = new RegExp('(?:' + foo.substring(0, foo.length - 1) + ')$');
            var urlRegex = whitelistRegex;

            return {
                restrict: 'E',
                link: function(scope, element, attrs) {

                    // only target external links
                    if (attrs.target !== '_blank' || element.hasClass('authorized-link')) {
                        return;
                    }

                    var checkWhiteList = function() {

                        var urlObj = parseUri(element.prop('href'));

                        // if (urlObj.path === '/hcp/') {
                        //     // hcp interstitial modal

                        //     setupInterstitial('hcp');

                        // } else {..below..}
                        if (urlRegex.test(urlObj.host)) {
                            // check if host matches white list
                            // bind interstitial modal

                            setupInterstitial('interstitial');

                        }
                    };

                    var setupInterstitial = function(modalName) {

                        element.on('click.interstitial', function(e) {
                            e.preventDefault();
                            e.stopPropagation();

                            scope.interstitialUrl = element.prop('href');

                            ModalService
                                .showModal({
                                    scope: scope,
                                    templateUrl: 'views/modal/' + modalName + '.html',
                                    controller: 'ModalController'
                                })
                                .then(function(modal) {
                                    modal.element.show();
                                });
                        });

                    };

                    var listener = scope.$watch(function() {
                        return attrs.href;
                    }, function() {

                        // Clear
                        listener();

                        checkWhiteList();
                    });

                    scope.$on('$destroy', function() {
                        element.off('.interstitial');
                    });
                }
            };
        }
    ]);

}).call(this);
