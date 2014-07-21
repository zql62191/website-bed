/* Controllers */
(function() {
    var app;

    app = angular.module('BED.controllers', []);

    app.controller('UnsubscribeController', ['$scope', UnsubscribeController]);
    function UnsubscribeController($scope) {
    	$scope.states = [
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

    	$scope.professions = [ 
            'Eating Disorder Clinician',
            'Internal Medicine',
            'Primary Care Physician',
            'Psychiatrist',
            'Psychologist'
    	];

        $scope.form = {
            optoutchoice: "none",
        };

        $scope.form.state = $scope.states[0];


    }
}).call(this);

/*Directives*/
(function () {
    var app = angular.module('BED.directives', []);

    app.directive('stateselect', function() {
        return {
            require: 'ngModel',
            link: function (scope, elm, attrs, ctrl) {
                ctrl.$parsers.unshift(function(viewValue) {
                    console.log(viewValue);
                    if(viewValue === '*state') {
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
}).call(this);

/* App */
(function() {
    var app;

    app = angular.module('BED', ['BED.controllers', 'BED.directives']);

}).call(this);