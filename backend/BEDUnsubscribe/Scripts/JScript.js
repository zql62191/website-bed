
/* Services */
(function () {
    var app;

    app = angular.module('BED.services', []);

    app.factory('ApiService', function ($http, $q, $window, $timeout, _, chance, bowser) {
        return {
            submitForm: function (path, data) {
                return $http({
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    url: '/Service/BEDService.svc/SetOptInData',
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
}).call(this);
/* Controllers */
(function () {
    var app;

    app = angular.module('BED.controllers', ['BED.services']);

    app.controller('BedController', function (ApiService, $scope, $log, $location, $window, $document, $timeout, _, chance, moment) {

        $window.onbeforeunload = function () {
            return '';
        };

        $scope.master = {};

        $scope.update = function (form_data) {
            $scope.master = angular.copy(form_data);
        };

        $scope.states = [
	    'ALABAMA',
	    'ALASKA',
		'ARIZONA',
		'ARKANSAS',
	    'CALIFORNIA',
	    'COLORADO',
		'CONNECTICUT',
	    'DELAWARE',
	    'FLORIDA',
	    'GEORGIA',
	    'HAWAII',
	    'IDAHO',
	    'ILLINOIS',
	    'INDIANA',
	    'IOWA',
	    'KANSAS',
	    'KENTUCKY',
	    'LOUISIANA',
	    'MAINE',
	    'MARYLAND',
	    'MASSACHUSETTS',
	    'MICHIGAN',
	    'MINNESOTA',
	    'MISSISSIPPI',
	    'MISSOURI',
	    'MONTANA',
	    'NEBRASKA',
	    'NEVADA',
	    'NEW HAMPSHIRE',
	    'NEW JERSEY',
	    'NEW MEXICO',
	    'NEW YORK',
	    'NORTH CAROLINA',
	    'NORTH DAKOTA',
	    'OHIO',
	    'OKLAHOMA',
	    'OREGON',
	    'PENNSYLVANIA',
	    'RHODE ISLAND',
	    'SOUTH CAROLINA',
	    'SOUTH DAKOTA',
	    'TENNESSEE',
	    'TEXAS',
	    'UTAH',
	    'VERMONT',
	    'VIRGINIA',
	    'WASHINGTON',
	    'WEST VIRGINIA',
	    'WISCONSIN',
	    'WYOMING'
	];

        $scope.professions = ["Doctor",
	"Developer",
	"Something Else"
	];

        //        $scope.env = {
        //            lcl: /local|ngrok|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/ig.test($location.host()),
        //            dev: /-dev|local|ngrok|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/ig.test($location.host()),
        //            uat: /-uat/ig.test($location.host()),
        //            stg: /-stg/ig.test($location.host()),
        //            prd: /-prd|synagis.com$/i.test($location.host()),
        //            dmo: /-stg2/ig.test($location.host())
        //        };

        $scope.today = function () {
            return moment().format('MM/DD/YYYY');
        };

        $scope.invalidSubmit = false;
        $scope.form_data = {};
        $scope.application_id = '';




        $scope.processForm = function () {

            $scope.success_modal = $scope.fail_modal = false;
            $scope.loading_modal = true;
            $window.alert('data1' + $scope.form_data);
            ApiService.submitForm($scope.post_path, $scope.form_data)
                .then(function (data) {
                    if (data.success === 'true') {
                        $scope.application_id = data.application_id;
                        $scope.loading_modal = false;
                        $scope.success_modal = true;
                    } else {
                        $scope.loading_modal = false;
                        $scope.fail_modal = true;
                    }
                }, function (error) {
                    $scope.loading_modal = false;
                    $scope.fail_modal = true;
                });

        };

        $scope.submitForm = function () {

            var oldHeight = $(document).height() - $(window).height();
            var oldTop = $(window).scrollTop();
            var oldBottom = oldHeight - oldTop;

            $timeout(function () {
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


        $scope.showErrors = function () {
            var errors = [];

            $('.ng-invalid:not(form)').each(function (i, el) {
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
//(function() {
//    var app;

//    app = angular.module('BED.directives', []);

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
//}).call(this);

/* App */
(function () {
    var app;

    app = angular.module('BED', ['BED.services', 'BED.controllers', 'BED.directives', 'BED.filters', 'ngRoute']);

}).call(this);