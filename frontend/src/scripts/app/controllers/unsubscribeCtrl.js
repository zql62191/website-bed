(function() {
    'use strict';

    angular.module('cdmp.controllers')


        .controller('emailController', ['$scope', function($scope) {
            
            $scope.submitted = false;

            $scope.submitForm = function() {
                $scope.submitted = true;
                $scope.$broadcast('show-errors-check-validity');


                if (!$scope.optOutEmail.$invalid) {
                    console.log("user submit");
                    window.location.href="/hcp/thank-you-request.aspx";

                }
            };


            $scope.syncFields = function(elem){
                //sync form field input across all 3 forms if a similarly-named field exists
                //called from any form field's blur? keyup? something?

                console.log("HELLO FRIENDS!");

                var elem = angular.element(elem.currentTarget);

                //check if elem's name attribute is in any other form on the page
                var otherFields = angular.element( "input[name=" + elem.prop('name') + "]" );

            };

        }])
        
        .controller('directmailController', ['$scope', function($scope) {

            $scope.submitted = false;

            $scope.submitForm = function() {
                $scope.submitted = true;
                $scope.$broadcast('show-errors-check-validity');

                if (!$scope.optoutdirectmail.$invalid) {
                    console.log("user submit");
                    window.location.href="/hcp/thank-you-request.aspx";
                }
                else{
                    console.log("Error!");
                    //alert("Please address the errors above!")
                }

            };

            $scope.syncFields = function(elem){
                emailController.syncFields(elem);
            };
        }])


        .controller('allmailController', ['$scope', function($scope) {

            $scope.submitted = false;

            $scope.submitForm = function() {
                $scope.submitted = true;
                $scope.$broadcast('show-errors-check-validity');

                if (!$scope.optinall.$invalid) {
                    console.log("user submit");
                    window.location.href="/hcp/thank-you-request.aspx";
                }
                else{
                    console.log("Error!");
                    //alert("Please address the errors above!")
                }

            };

            $scope.syncFields = function(elem){
                emailController.syncFields(elem);
            };
        }])
        

        .directive('showErrors', function (showErrorsConfig) {
            var getShowSuccess;
            getShowSuccess = function (options) {
                var showSuccess;
                showSuccess = showErrorsConfig.showSuccess;
                if (options && options.showSuccess != null) {
                    showSuccess = options.showSuccess;
                }
                return showSuccess;
            };
        })

        .provider('showErrorsConfig', function () {
            var _showSuccess;
            _showSuccess = false;
            this.showSuccess = function (showSuccess) {
                return _showSuccess = showSuccess;
            };
            this.$get = function () {
                return { showSuccess: _showSuccess };
            };
        })    

    //.controller('clickController', ['$scope', function($scope){
    //    $scope.clickToTY = function(){
    //        window.location.href="thank-you-request.aspx";
    //    }
    //}])



}).call(this);
 
