(function() {
    'use strict';

    angular.module('cdmp.controllers')


        .controller('emailController', ['$scope', function($scope) {
            
            $scope.submitted = false;

            $scope.submitForm = function() {
                $scope.submitted = true;

                if (!$scope.optOutEmail.$invalid) {
                    console.log("user submit");
                    window.location.href="/hcp/thank-you-request.aspx";

                }
            };

        }])
        
        .controller('directmailController', ['$scope', function($scope) {

            $scope.submitted = false;

            $scope.submitForm = function() {
                $scope.submitted = true;
                //$scope.$broadcast('show-errors-check-validity');

                if (!$scope.optoutdirectmail.$invalid) {
                    console.log("user submit");
                    window.location.href="/hcp/thank-you-request.aspx";
                }
                else{
                    console.log("Error!");
                    //alert("Please address the errors above!")
                }

            };

        }])


        .controller('allmailController', ['$scope', function($scope) {

            $scope.submitted = false;

            $scope.submitForm = function() {
                $scope.submitted = true;
                //$scope.$broadcast('show-errors-check-validity');

                if (!$scope.optinall.$invalid) {
                    console.log("user submit");
                    window.location.href="/hcp/thank-you-request.aspx";
                }
                else{
                    console.log("Error!");
                    //alert("Please address the errors above!")
                }

            };

        }])
       

    //.controller('clickController', ['$scope', function($scope){
    //    $scope.clickToTY = function(){
    //        window.location.href="thank-you-request.aspx";
    //    }
    //}])



}).call(this);


