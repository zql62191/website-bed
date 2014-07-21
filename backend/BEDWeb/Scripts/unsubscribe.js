/* Services */
(function () {
    var app;

    app = angular.module('BED.services', []);

    app.factory('ApiService', function ($http, $q, $window, $timeout, _) {
        return {
            submitForm: function (path, data) {
                return $http({
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    url: 'http://localhost:63407/BEDService/setOptInData',
                    method: 'POST',
                    data: $.param(data)
                }).then(function (response) {
                    if (response.data.success === 'true') {
                        return response.data;
                    } else {
                        return $q.reject(response.data);
                    }
                }, function (response) {
                    return $q.reject(response.data);
                });
            }
       };
    });

       angular.module('lodash', []).factory('_', function() {
        return window._;
    });

}).call(this);

/* Controllers */
(function() {
    var app;

    app = angular.module('BED.controllers', ['BED.services']);

    app.controller('UnsubscribeController', function(ApiService, $scope, $log, $location, $window, $document, $timeout, _) {

        $window.onbeforeunload = function() {
            return '';
        };
    $scope.master = {};

  	$scope.update = function(form_data) {
    	$scope.master = angular.copy(form_data);
	};

	$scope.states = [
	    'Alabama',
	    'Alaska',
		'Arizona', 
		'Arkansas',
	    'California',
	    'Colorado',
		'Connecticut',
	    'Delaware',
	    'Florida',
	    'Georgia',
	    'Hawaii',
	    'Idaho',
	    'Illinois',
	    'Indiana', 
	    'Iowa',
	    'Kanasas',
	    'Kentucky',
	    'Lousiana',
	    'Maine',
	    'Maryland',
	    'Massachusetts',
	    'Michigan',
	    'Minnesota',
	    'Missippi',
	    'Missouri',
	    'Montana',
	    'Nebraska',
	    'Nevada',
	    'New Hampshire',
	    'New Jersey',
	    'New Mexico',
	    'New York',
	    'North Carolina',
	    'North Dakota',
	    'Ohio',
	    'Oklahoma',
	    'Oregon',
	    'Pennsylvania',
	    'Rhode Island',
	    'South Carolina',
	    'South Dakota',
	    'Tennessee',
	    'Texas',
	    'Utah',
	    'Vermont',
	    'Virginia',
	    'Washington',
	    'West Virginia',
	    'Wisconsin',
	    'Wyoming',
        'American Samoa',
        'Guam',
        'Northern Mariana Islands',
        'Puerto Rico',
        'U.S. Minor Outlying Islands',
        'U.S. Virgin Islands'
	];

	$scope.professions = [ 
    'Eating Disorder Clinician',
    'Internal Medicine',
    'Primary Care Physician',
    'Psychiatrist',
    'Psychologist'
	];

    $scope.form = {
                optoutchoice: "none"
                   };

//        $scope.env = {
//            lcl: /local|ngrok|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/ig.test($location.host()),
//            dev: /-dev|local|ngrok|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/ig.test($location.host()),
//            uat: /-uat/ig.test($location.host()),
//            stg: /-stg/ig.test($location.host()),
//            prd: /-prd|synagis.com$/i.test($location.host()),
//            dmo: /-stg2/ig.test($location.host())
//        };

//        $scope.today = function() {
//            return moment().format('MM/DD/YYYY');
//        };
      
        $scope.invalidSubmit = false;
        $scope.form_data = {};
        $scope.application_id = '';

      


        $scope.processForm = function() {

            $scope.success_modal = $scope.fail_modal = false;
            $scope.loading_modal = true;
            $window.alert('data1' + $scope.form_data.fname);
            ApiService.submitForm($scope.post_path, $scope.form_data)
                .then(function(data) {
                    if (data.success === 'true') {
                        $scope.application_id = data.application_id;
                        $scope.loading_modal = false;
                        $scope.success_modal = true;
                    } else {
                        $scope.loading_modal = false;
                        $scope.fail_modal = true;
                    }
                }, function(error) {
                    $scope.loading_modal = false;
                    $scope.fail_modal = true;
                });

        };

        $scope.submitForm = function() {

            var oldHeight = $(document).height() - $(window).height();
            var oldTop = $(window).scrollTop();
            var oldBottom = oldHeight - oldTop;

            $timeout(function() {
                var newHeight = $(document).height() - $(window).height();
                var newTop = $(window).scrollTop();
                var newBottom = newHeight - newTop;
                var bottomDifference = newBottom - oldBottom;

                $(window).scrollTop(oldTop + bottomDifference);
            }, 100);

            if (!$scope.BEDForm.$valid) {
                $scope.invalidSubmit = true;
            } else {
                $scope.invalidSubmit = false;
//                if ($scope.env.dmo || $scope.env.stg) {
//                    $scope.fauxProcessForm();
//                } else {
                    $scope.processForm();
//                }
            }
        };


         $scope.showErrors = function() {
            var errors = [];

            $('.ng-invalid:not(form)').each(function(i, el) {
                var name = $(this).attr('name');
                if (!_.contains(errors, name)) {
                    errors.push(name);
                }
            });

            if (errors.length > 0) {
                alert('Invalid fields:\n\n' + errors.join('\n'));
            }
        };
    });
}).call(this);

///* Directives */
(function() {
    var app;

    app = angular.module('BED.directives', []);

//  app.directive('confirmemail', function() {
//	return {
//		require: 'ngModel',
//		link: function(scope, elm, attrs, ctrl) {
//			ctrl.$parsers.unshift(function(viewValue) {
//				if(angular.equals(scope.form_data.email, viewValue)) {
//					//set validity
//					ctrl.$setValidity('confirmemail', true);
//					return viewValue;
//				}	else {
//					ctrl.$setValidity('confirmemail', false);
//					return undefined;
//				}
//			});
//		}
//	};
//});
}).call(this);

/* App */
(function() {
    var app;

    app = angular.module('BED', ['BED.services', 'BED.controllers', 'BED.directives', 'ngRoute','lodash']);

}).call(this);