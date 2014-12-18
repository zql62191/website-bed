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
        'District of Columbia',
        'Florida',
        'Georgia',
        'Hawaii',
        'Idaho',
        'Illinois',
        'Indiana',
        'Iowa',
        'Kansas',
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
        'Wyoming'
    ];

    app = angular.module('BED.controllers', []);

    app.controller('UnsubscribeController', ['$scope', '$window', '$location', '$log', '$document', '$timeout', '$http', UnsubscribeController]);

    function UnsubscribeController($scope, $window, $location, $log, $document, $timeout, $http) {

        $scope.states = statearray;
        $scope.invalidform = false;
        $scope.MID = $window.parseUri($window.location.href).queryKey['mid'] || 0;
        $scope.form = {
            optoutchoice: 'none'
        };
        $scope.form.state = $scope.states[0];

        $scope.unsubscribe = function() {
            var oldHeight = $(document).height() - $(window).height();
            var oldTop = $(window).scrollTop();
            var oldBottom = oldHeight - oldTop;

            // $log.log('mid', $scope.MID);

            if (!$scope.bed_form.$valid) {
                // $log.log(2);
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
                    break;
            }
        };

        $scope.unsubscribeAll = function() {

            // $log.log('unsubscribeAll');

            if (angular.equals($scope.form.state, '*State')) {
                $scope.invalidform = true;
                return;
            }

            var URL;
            var data = {
                'email': {
                    'Email': $scope.form.email,
                    'ConfirmEmail': $scope.form.email
                },
                'address': {
                    'FName': $scope.form.fname,
                    'MName': $scope.checkFormPresent($scope.form.MI),
                    'LName': $scope.form.lname,
                    'Address1': $scope.form.street,
                    'Address2': $scope.checkFormPresent($scope.form.suite),
                    'City': $scope.form.city,
                    'State': convertStateToAbbr($scope.form.state),
                    'Zip': $scope.form.zip
                },
                'sourceCode': $scope.MID
            };

            URL = '/Unsubscribe/Service/BEDUnsubscribe.svc/SetUnsubscribeDataBoth';
            Data = JSON.stringify(data);

            $scope.processForm(URL, Data);
        };

        $scope.unsubscribeDirect = function() {

            // $log.log('unsubscribeDirect');

            if (angular.equals($scope.form.state, '*State')) {
                $scope.invalidform = true;
                return;
            }

            $scope.processing = true;

            var URL;
            var data = {
                'email': {
                    'Email': $scope.form.email,
                    'ConfirmEmail': $scope.form.email
                },
                'address': {
                    'FName': $scope.form.fname,
                    'MName': $scope.checkFormPresent($scope.form.MI),
                    'LName': $scope.form.lname,
                    'Address1': $scope.form.street,
                    'Address2': $scope.checkFormPresent($scope.form.suite),
                    'City': $scope.form.city,
                    'State': convertStateToAbbr($scope.form.state),
                    'Zip': $scope.form.zip
                },
                'sourceCode': $scope.MID
            };

            URL = '/Unsubscribe/Service/BEDUnsubscribe.svc/SetUnsubscribeDataAddress';
            Data = JSON.stringify(data);

            $scope.processForm(URL, Data);
        };

        $scope.unsubscribeEmail = function() {

            // $log.log('unsubscribeEmail');

            var URL;
            var data = {
                'email': {
                    'Email': $scope.form.email,
                    'ConfirmEmail': $scope.form.email
                },
                'sourceCode': $scope.MID
            };

            URL = '/Unsubscribe/Service/BEDUnsubscribe.svc/SetUnsubscribeDataEmail';
            Data = JSON.stringify(data);

            $scope.processForm(URL, Data);
        };

        $scope.processForm = function(path, sdata) {


            $http({
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
                method: 'POST',
                url: path,
                data: sdata
            }).
            success(function() {
                $scope.clearFormData();
                BED.Modal.open('unsubscribe');
                BED.Analytics.formOnComplete('Unsubscribe');
            }).
            error(function(data) {
                $scope.clearFormData();
                BED.Modal.open('unsubscribe_error');
            });

            $scope.processing = false;
        };

        $scope.checkFormPresent = function(item) {
            if (item) {
                return item;
            } else {
                return null;
            }
        };

        $scope.clearFormData = function() {
            $scope.bed_form.$setPristine();
            $scope.invalidform = false;
            $scope.form.email = null;
            $scope.form.fname = null;
            $scope.form.MI = null;
            $scope.form.lname = null;
            $scope.form.street = null;
            $scope.form.suite = null;
            $scope.form.city = null;
            $scope.form.state = 0;
            $scope.form.zip = null;
        };
    }

    app.controller('OptInController', ['$scope', '$window', '$location', '$log', '$document', '$timeout', '$http', OptInController]);

    function OptInController($scope, $window, $location, $log, $document, $timeout, $http) {
        $scope.states = statearray;
        $scope.MID = $window.parseUri($window.location.href).queryKey['mid'] || 0;
        $scope.invalidform = false;
        $scope.regComplete = false;
        $scope.submitted = false;
        $scope.processing = false;
        $scope.professions = [
            '*Profession',
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
                'optIn': {
                    'CommunicationsOptIn': 1,
                    'Email': {
                        'Email': $scope.form.email,
                        'ConfirmEmail': $scope.form.email
                    },
                    'Name': {
                        'FName': $scope.form.fname,
                        'LName': $scope.form.lname,
                    }
                },
                'sourceCode': $scope.MID

            };

            if (!$scope.bed_form.$valid) {
                // print error
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

            URL = '/Service/BEDService.svc/SetOptInData';
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

        $scope.clearFormData = function() {
            $scope.bed_form.$setPristine();
            $scope.invalidform = false;
            $scope.form.email = null;
            $scope.form.confirmemail = null;
            $scope.form.fname = null;
            $scope.form.MI = null;
            $scope.form.lname = null;
            $scope.form.street = null;
            $scope.form.suite = null;
            $scope.form.city = null;
            $scope.form.state = 0;
            $scope.form.zip = null;
            $scope.form.profession = 0;
            $scope.form.checkbox = false;
        };

        $scope.processOptIn = function(path, sdata) {


            // if its already been clicked don't do anything (avoid multiple backend submissions)
            if ($scope.submitted) {
                return;
            }



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
                //BED.Modal.open('signup');
                //BED.SlideOut.close();

                $scope.clearFormData();
                $scope.regComplete = true;
                BED.Analytics.formOnComplete('Registration');
            }).
            error(function(data) {
                $scope.clearFormData();
                BED.Modal.open('signup_error');
            });
        };

        $scope.toDSM5 = function() {
            $window.location.href = "bed_dsm5_download.aspx";
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
    // app.directive('confirmemail', function() {
    //     return {
    //         require: 'ngModel',
    //         link: function(scope, elm, attrs, ctrl) {
    //             ctrl.$parsers.unshift(function(viewValue) {
    //                 if (scope.form.email && viewValue) {
    //                     if (angular.equals(scope.form.email.toLowerCase(), viewValue.toLowerCase())) {
    //                         //set validity
    //                         ctrl.$setValidity('confirmemail', true);
    //                         return viewValue;
    //                     } else {
    //                         ctrl.$setValidity('confirmemail', false);
    //                         return undefined;
    //                     }
    //                 } else {
    //                     ctrl.$setValidity('confirmemail', false);
    //                     return undefined;
    //                 }
    //             });
    //         }
    //     };
    // });

    // Elegant placeholder polyfill hack
    app.directive('ngIf', function() {
        return {
            link: function(scope, elm, attrs) {
                $('input, textarea', elm).placeholder();
            }
        };
    });

}).call(this);

/* App */
(function() {
    var app;

    app = angular.module('BED', ['BED.controllers', 'BED.directives', 'ui.utils']);

}).call(this);

/* support functions */
function convertSpecToCode(specialty) {

    var specs = {
        'Eating Disorder Clinician': 'EDC',
        'Internal Medicine': 'IM',
        'Primary Care Physician': 'PCPR',
        'Psychiatrist': 'P',
        'Psychologist': 'PSY',
        'Other': 'OS'
    };

    if (specs[specialty]) {
        return specs[specialty];
    } else {
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
        'District of Columbia': 'DC',
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
        'Wyoming': 'WY'
    };

    if (states[state]) {
        return states[state];
    } else {
        return null;
    }
}