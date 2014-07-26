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
                    "State": convertStateToAbbr($scope.form.state),
                    "Zip": $scope.form.zip
                }
            };

            URL = "http://localhost:54953/BEDSite/Service/BEDService.svc/SetUnsubscribeDataAll";
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

            URL = "http://localhost:54953/BEDSite/Service/BEDService.svc/SetUnsubscribeDataDirect";
            Data = JSON.stringify(data);

            $scope.processForm(URL, Data);
        };

        $scope.unsubscribeEmail = function() {
            var URL;
            var data = {
                "Email": $scope.form.email,
                "ConfirmEmail": $scope.form.email
            };

            URL = "http://localhost:54953/BEDSite/Service/BEDService.svc/SetUnsubscribeDataEmail";
            Data = JSON.stringify(data);

            $scope.processForm(URL, Data);
        };

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
                return;
            }

            $timeout(function() {
                var newHeight = $(document).height() - $(window).height();
                var newTop = $(window).scrollTop();
                var newBottom = newHeight - newTop;
                var bottomDifference = newBottom - oldBottom;

                $(window).scrollTop(oldTop + bottomDifference);
            }, 100);

            URL = "http://localhost:54953/BEDSite/Service/BEDService.svc/SetOptInData";
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
        default:
            return null;
    }
}

function convertStateToAbbr(state) {
    switch (state) {
        case 'Alabama':
            return 'AL';
        case 'Alaska':
            return 'AK';
        case 'Arizona':
            return 'AZ';
        case 'Arkansas':
            return 'AR';
        case 'California':
            return 'CA';
        case 'Colorado':
            return 'CO';
        case 'Connecticut':
            return 'CT';
        case 'Delaware':
            return 'DE';
        case 'Florida':
            return 'FL';
        case 'Georgia':
            return 'GA';
        case 'Hawaii':
            return 'HI';
        case 'Idaho':
            return 'ID';
        case 'Illinois':
            return 'IL';
        case 'Indiana':
            return 'IN';
        case 'Iowa':
            return 'IA';
        case 'Kansas':
            return 'KS';
        case 'Kentucky':
            return 'KY';
        case 'Louisiana':
            return 'LA';
        case 'Maine':
            return 'ME';
        case 'Maryland':
            return 'MD';
        case 'Massachusetts':
            return 'MA';
        case 'Michigan':
            return 'MI';
        case 'Minnesota':
            return 'MN';
        case 'Mississippi':
            return 'MS';
        case 'Missouri':
            return 'MO';
        case 'Montana':
            return 'MT';
        case 'Nebraska':
            return 'NE';
        case 'Nevada':
            return 'NV';
        case 'New Hampshire':
            return 'NH';
        case 'New Jersey':
            return 'NJ';
        case 'New Mexico':
            return 'NM';
        case 'New York':
            return 'NY';
        case 'North Carolina':
            return 'NC';
        case 'North Dakota':
            return 'ND';
        case 'Ohio':
            return 'OH';
        case 'Oklahoma':
            return 'OK';
        case 'Oregon':
            return 'OR';
        case 'Pennsylvania':
            return 'PA';
        case 'Rhode Island':
            return 'RI';
        case 'South Carolina':
            return 'SC';
        case 'South Dakota':
            return 'SD';
        case 'Tennessee':
            return 'TN';
        case 'Texas':
            return 'TX';
        case 'Utah':
            return 'UT';
        case 'Vermont':
            return 'VT';
        case 'Virginia':
            return 'VA';
        case 'Washington':
            return 'WA';
        case 'West Virginia':
            return 'WV';
        case 'Wisconsin':
            return 'WI';
        case 'Wyoming':
            return 'WY';
        case 'Puerto Rico':
            return 'PR';
        case 'Guam':
            return 'GU';
        case 'Northern Mariana Islands':
            return 'MP';
        case 'Puerto Rico':
            return 'PR';
        case 'U.S. Minor Outlying Islands':
            return 'UM';
        case 'U.S. Virgin Islands':
            return 'VI';
        default:
            return null;
    }
}