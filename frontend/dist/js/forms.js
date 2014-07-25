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

    app.controller('UnsubscribeController', ['$scope', UnsubscribeController]);

    function UnsubscribeController($scope) {
        $scope.states = statearray;

        $scope.form = {
            optoutchoice: "none",
        };

        $scope.professions = [
            '*Profession',
            'Eating Disorder Clinician',
            'Internal Medicine',
            'Primary Care Physician',
            'Psychiatrist',
            'Psychologist'
        ];

        $scope.form.state = $scope.states[0];
        $scope.form.profession = $scope.professions[0];
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