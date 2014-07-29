/****
 *
 * Angular Code
 *
 ****/

/* Controllers */
(function() {
    var app;
    var statearray = [
        'Alabama',
        'Alaska',
        'Arizona',
        'Arkansas',
        'California',
        'Colorado',
        'Connecticut',
        'Delaware',
        'District of Columbia',
        'Florida',
        'Georgia',
        'Hawaii',
        'Idaho',
        'Illinois',
        'Indiana',
        'Iowa',
        'Kanasas',
        'Kentucky',
        'Louisiana',
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
    ];

    app = angular.module('BED.controllers', []);

    app.controller('UnsubscribeController', ['$scope', '$window', '$log', '$location', '$document', '$timeout', '$http', UnsubscribeController]);

    function UnsubscribeController($scope, $window, $log, $location, $document, $timeout, $http) {

        $scope.states = statearray;
        $scope.invalidform = false;
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
                $scope.invalidform = true;
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
                    "MName": $scope.checkFormPresent($scope.form.MI),
                    "LName": $scope.form.lname,
                    "Address1": $scope.form.street,
                    "Address2": $scope.checkFormPresent($scope.form.suite),
                    "City": $scope.form.city,
                    "State": convertStateToAbbr($scope.form.state),
                    "Zip": $scope.form.zip
                }
            };
            $log.log(convertStateToAbbr($scope.form.state));

            URL = "http://localhost:1210/Unsubscribe/Service/BEDUnsubscribe.svc/SetUnsubscribeDataBoth";
            Data = JSON.stringify(data);

            $scope.processForm(URL, Data);
        };

        $scope.unsubscribeDirect = function() {
            var URL;
            var data = {
                "FName": $scope.form.fname,
                "MName": $scope.checkFormPresent($scope.form.MI),
                "LName": $scope.form.lname,
                "Address1": $scope.form.street,
                "Address2": $scope.checkFormPresent($scope.form.suite),
                "City": $scope.form.city,
                "State": convertStateToAbbr($scope.form.state),
                "Zip": $scope.form.zip
            };

            URL = "http://localhost:1210/Unsubscribe/Service/BEDUnsubscribe.svc/SetUnsubscribeDataAddress";
            Data = JSON.stringify(data);

            $scope.processForm(URL, Data);
        };

        $scope.unsubscribeEmail = function() {
            var URL;
            var data = {
                "Email": $scope.form.email,
                "ConfirmEmail": $scope.form.email
            };

            URL = "http://localhost:1210/Unsubscribe/Service/BEDUnsubscribe.svc/SetUnsubscribeDataEmail";
            Data = JSON.stringify(data);

            $scope.processForm(URL, Data);
        };

        $scope.processForm = function(path, sdata) {
            $log.log(sdata);
            $http({
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
                method: 'POST',
                url: path,
                data: sdata,
            }).
            success(function() {
                showUnsubscribeThankYou();
            }).
            error(function(data) {
                $log.log(data);
            });
        };

        $scope.checkFormPresent = function(item) {
            if (item) {
                return item;
            } else {
                return null;
            }
        };
    }

    app.controller('OptInController', ['$scope', '$window', '$log', '$location', '$document', '$timeout', '$http', OptInController]);

    function OptInController($scope, $window, $log, $location, $document, $timeout, $http) {
        $scope.states = statearray;
        $scope.invalidform = false;
        $scope.professions = [
            'Eating Disorder Clinician',
            'Internal Medicine',
            'Primary Care Physician',
            'Psychiatrist',
            'Psychologist',
            'Other'
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
                "Specialty": convertSpecToCode($scope.form.profession),
                "CommunicationsOptIn": 1,
                "Email": {
                    "Email": $scope.form.email,
                    "ConfirmEmail": $scope.form.email
                },
                "Address": {
                    "FName": $scope.form.fname,
                    "MName": $scope.checkFormPresent($scope.form.MI),
                    "LName": $scope.form.lname,
                    "Address1": $scope.form.street,
                    "Address2": $scope.checkFormPresent($scope.form.suite),
                    "City": $scope.form.city,
                    "State": convertStateToAbbr($scope.form.state),
                    "Zip": $scope.form.zip
                }
            };

            if (!$scope.bed_form.$valid) {
                /*print error*/
                $scope.invalidform = true;
                return;
            }

            $timeout(function() {
                var newHeight = $(document).height() - $(window).height();
                var newTop = $(window).scrollTop();
                var newBottom = newHeight - newTop;
                var bottomDifference = newBottom - oldBottom;

                $(window).scrollTop(oldTop + bottomDifference);
            }, 100);

            URL = "/BEDSite/Service/BEDService.svc/SetOptInData";
            Data = JSON.stringify(data);

            $scope.processOptIn(URL, Data);

        };

        $scope.checkFormPresent = function(item) {
            if (item) {
                return item;
            } else {
                return null;
            }
        };

        $scope.processOptIn = function(path, sdata) {
            $log.log(sdata);
            $http({
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
                method: 'POST',
                url: path,
                data: sdata,
                'dataType': 'json'
            }).
            success(function() {
                showSignUpThankYou();
            }).
            error(function(data) {
                $log.log(data);
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

/* support functions */
function convertSpecToCode(specialty) {
    switch (specialty) {
        case 'Eating Disorder Clinician':
            return 'EDC';
        case 'Internal Medicine':
            return 'IM';
        case 'Primary Care Physician':
            return 'PCPR';
        case 'Psychiatrist':
            return 'P';
        case 'Psychologist':
            return 'PSY';
        case 'Other':
            return 'OS';
        default:
            return null;
    }
}

function convertStateToAbbr(state) {

    var states = {
        'Alabama': 'AL',
        'Alaska': 'AK',
        'Arizona': 'AZ',
        'Arkansas': 'AR',
        'California': 'CA',
        'Colorado': 'CO',
        'Connecticut': 'CT',
        'Delaware': 'DE',
        'Florida': 'FL',
        'Georgia': 'GA',
        'Hawaii': 'HI',
        'Idaho': 'ID',
        'Illinois': 'IL',
        'Indiana': 'IN',
        'Iowa': 'IA',
        'Kansas': 'KS',
        'Kentucky': 'KY',
        'Louisiana': 'LA',
        'Maine': 'ME',
        'Maryland': 'MD',
        'Massachusetts': 'MA',
        'Michigan': 'MI',
        'Minnesota': 'MN',
        'Mississippi': 'MS',
        'Missouri': 'MO',
        'Montana': 'MT',
        'Nebraska': 'NE',
        'Nevada': 'NV',
        'New Hampshire': 'NH',
        'New Jersey': 'NJ',
        'New Mexico': 'NM',
        'New York': 'NY',
        'North Carolina': 'NC',
        'North Dakota': 'ND',
        'Ohio': 'OH',
        'Oklahoma': 'OK',
        'Oregon': 'OR',
        'Pennsylvania': 'PA',
        'Rhode Island': 'RI',
        'South Carolina': 'SC',
        'South Dakota': 'SD',
        'Tennessee': 'TN',
        'Texas': 'TX',
        'Utah': 'UT',
        'Vermont': 'VT',
        'Virginia': 'VA',
        'Washington': 'WA',
        'West Virginia': 'WV',
        'Wisconsin': 'WI',
        'Wyoming': 'WY',
    };

    if (states[state]) {
        return states[state];
    } else {
        return null;
    }
}

function showSignUpThankYou() {
    $('.modal.modal--signup').show();
}

function showUnsubscribeThankYou() {
    $('.modal.modal--unsubscribe').show();
}