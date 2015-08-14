(function() {
    'use strict';

    angular.module('cdmp.controllers')


        .controller('emailController', ['$scope', function($scope) {

            $scope.submitted = false;

            $scope.submitForm = function() {
                $scope.submitted = true;
                //$scope.$broadcast('show-errors-check-validity'); // uses the provider service

                if (!$scope.optOutEmail.$invalid) {
                    console.log("user submit");
                    window.location.href="/hcp/thank-you-request.aspx";

                }
            };

            $scope.syncFields = function(e){
                //the original
                var thisfield = angular.element(e.currentTarget);
                var name = thisfield.prop('name');

                var others = angular.element("input[name='" + name + "'], select[name='" + name + "']");
                others.val( thisfield.val() );
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

            
            $scope.syncFields = function(e){
                //it pains me to copypasta this... JM
                var thisfield = angular.element(e.currentTarget);
                var name = thisfield.prop('name');

                var others = angular.element("input[name='" + name + "'], select[name='" + name + "']");
                others.val( thisfield.val() );
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


            $scope.syncFields = function(e){
                //it pains me to copypasta this... JM
                var thisfield = angular.element(e.currentTarget);
                var name = thisfield.prop('name');

                var others = angular.element("input[name='" + name + "'], select[name='" + name + "']");
                others.val( thisfield.val() );
            };

        }])

    //.controller('clickController', ['$scope', function($scope){
    //    $scope.clickToTY = function(){
    //        window.location.href="thank-you-request.aspx";
    //    }
    //}])



}).call(this);


