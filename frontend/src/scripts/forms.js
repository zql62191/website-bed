/****
 *
 * Angular Code
 *
 ****/

/* Controllers */
(function() {
    var app;
    var statearray = [
        '*State',
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

    app = angular.module('BED.controllers', []);

    app.controller('UnsubscribeController', ['$scope', '$window', '$log', '$location', '$document', '$timeout', '$http', UnsubscribeController]);

    function UnsubscribeController($scope, $window, $log, $location, $document, $timeout, $http) {

        $scope.states = statearray;

        $scope.form = {
            optoutchoice: "none"
        };

        $scope.form.state = $scope.states[0];

        $scope.unsubscribe = function() {
            var oldHeight = $(document).height() - $(window).height();
            var oldTop = $(window).scrollTop();
            var oldBottom = oldHeight - oldTop;

            if (!$scope.bed_form.$valid) {
                /*print error*/
                return;
            }

            $timeout(function() {
                var newHeight = $(document).height() - $(window).height();
                var newTop = $(window).scrollTop();
                var newBottom = newHeight - newTop;
                var bottomDifference = newBottom - oldBottom;

                $(window).scrollTop(oldTop + bottomDifference);
            }, 100);

            switch ($('input:checked').val()) {
                case 'email':
                    $scope.unsubscribeEmail();
                    break;
                case 'direct':
                    $scope.unsubscribeDirect();
                    break;
                case 'both':
                    $scope.unsubscribeAll();
                    break;
                default:
                    console.log('No option selected.');
                    break;
            }
        };

        $scope.unsubscribeAll = function() {
            var URL;
            var data = {
                "email": {
                    "Email": $scope.form.email,
                    "ConfirmEmail": $scope.form.email
                },
                "address": {
                    "FName": $scope.form.fname,
                    "MName": $scope.form.MI,
                    "LName": $scope.form.lname,
                    "Address1": $scope.form.street,
                    "Address2": $scope.form.suite,
                    "City": $scope.form.city,
                    "State": "OH",
                    "Zip": $scope.form.zip
                }
            };

            URL = "http://localhost:54953/BEDSite/Service/BEDService.svc/SetUnsubscribeDataAll";
            Data = JSON.stringify(data);

            $scope.processForm(URL, Data);
        };

        function unsubscribeDirect() {
            var URL;
            var data = {
                "address": {
                    "FName": "Test",
                    "MName": "T",
                    "LName": "Test",
                    "Address1": "address1",
                    "Address2": "address2",
                    "City": "city",
                    "State": "OH",
                    "Zip": "11111"
                }
            };

            URL = "http://localhost:54953/BEDSite/Service/BEDService.svc/SetUnsubscribeDataDirect";
            Data = JSON.stringify(data);

            $scope.processForm(URL, Data);
        }

        function unsubscribeEmail() {
            var URL;
            var data = {
                "FormEmail": {
                    "Email": "email@email.cim",
                    "ConfirmEmail": "email@email.cim"
                }
            };

            URL = "http://localhost:54953BEDSite/Service/BEDService.svc/SetUnsubscribeDataEmail";
            Data = JSON.stringify(data);

            $scope.processForm(URL, Data);
        }

        $scope.processForm = function(path, sdata) {
            $log.log(sdata);
            $http({
                headers: {
                    'Accept': 'application/json, text/javascript',
                    'Content-Type': 'application/json; charset=utf-8'
                },
                method: 'POST',
                url: path,
                data: sdata,
                'dataType': 'json'
            });
        };
    }

    app.controller('OptInController', ['$scope', '$window', '$log', '$location', '$document', '$timeout', '$http', OptInController]);

    function OptInController($scope, $window, $log, $location, $document, $timeout, $http) {

        $scope.states = statearray;
        $scope.professions = [
            '*Profession',
            'Eating Disorder Clinician',
            'Internal Medicine',
            'Primary Care Physician',
            'Psychiatrist',
            'Psychologist'
        ];

        $scope.form = {

        };

        $scope.form.state = $scope.states[0];
        $scope.form.profession = $scope.professions[0];



        $scope.optIn = function() {
            var oldHeight = $(document).height() - $(window).height();
            var oldTop = $(window).scrollTop();
            var oldBottom = oldHeight - oldTop;
            var URL;
            var data = {
                "optIn": {
                    "email": {
                        "Email": $scope.form.email,
                        "ConfirmEmail": $scope.form.email
                    },
                    "address": {
                        "FName": $scope.form.fname,
                        "MName": $scope.form.MI,
                        "LName": $scope.form.lname,
                        "Address1": $scope.form.street,
                        "Address2": $scope.form.suite,
                        "City": $scope.form.city,
                        "State": "OH",
                        "Zip": $scope.form.zip
                    }
                }
            };

            if (!$scope.bed_form.$valid) {
                /*print error*/
                return;
            }

            $timeout(function() {
                var newHeight = $(document).height() - $(window).height();
                var newTop = $(window).scrollTop();
                var newBottom = newHeight - newTop;
                var bottomDifference = newBottom - oldBottom;

                $(window).scrollTop(oldTop + bottomDifference);
            }, 100);

            URL = "http://localhost:54953BEDSite/Service/BEDService.svc/SetOptInData";
            Data = JSON.stringify(data);

            $scope.processOptIn(URL, Data);

        };

        $scope.processOptIn = function(path, sdata) {
            $log.log(sdata);
            $http({
                headers: {
                    'Accept': 'application/json, text/javascript',
                    'Content-Type': 'application/json; charset=utf-8'
                },
                method: 'POST',
                url: path,
                data: sdata,
                'dataType': 'json'
            });
        };
    }
}).call(this);

/*Directives*/
(function() {
    var app = angular.module('BED.directives', []);

    /*custom validator - state select */
    app.directive('stateselect', function() {
        return {
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {
                ctrl.$parsers.unshift(function(viewValue) {
                    if (viewValue === '*State') {
                        ctrl.$setValidity('stateselect', false);
                        return viewValue;
                    } else {
                        ctrl.$setValidity('stateselect', true);
                        return viewValue;
                    }
                });
            }
        };
    });

    app.directive('profselect', function() {
        return {
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {
                ctrl.$parsers.unshift(function(viewValue) {
                    if (viewValue === '*Profession') {
                        ctrl.$setValidity('profselect', false);
                        return viewValue;
                    } else {
                        ctrl.$setValidity('profselect', true);
                        return viewValue;
                    }
                });
            }
        };
    });

    /*custom validator - confirmtaion email */
    app.directive('confirmemail', function() {
        return {
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {
                ctrl.$parsers.unshift(function(viewValue) {
                    if (angular.equals(scope.form.email, viewValue)) {
                        //set validity
                        ctrl.$setValidity('confirmemail', true);
                        return viewValue;
                    } else {
                        ctrl.$setValidity('confirmemail', false);
                        return undefined;
                    }
                });
            }
        };
    });
}).call(this);

/* App */
(function() {
    var app;

    app = angular.module('BED', ['BED.controllers', 'BED.directives']);

}).call(this);