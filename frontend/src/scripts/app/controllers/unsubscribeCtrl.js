(function() {
    'use strict';

    angular.module('cdmp.controllers')

<<<<<<< HEAD
        .controller('mailController', ['$scope', function($scope) {

=======
        .controller('emailController', ['$scope', function($scope) {
>>>>>>> e5d5592d9cd02840e9a7eac4ea6e7ead7af3e8fb
            $scope.submitted = false;

            $scope.submitForm = function() {
                $scope.submitted = true;
                $scope.$broadcast('show-errors-check-validity');
<<<<<<< HEAD

                if (!$scope.optoutemail.$invalid) {
                    console.log("user submit");
                    window.location.href="/hcp/thank-you-request.aspx";
=======
                if (!$scope.optOutEmail.$invalid) {
                    //alert('Successful login');
                    console.log("user submit");
                    window.location.href="thank-you-request.aspx";
                    }
                };
        }])

        .controller('directMailController', ['$scope', function($scope) {
            $scope.submitted = false;
           
            $scope.submitEmail = function() {
                $scope.submitted = true;
                $scope.$broadcast('show-errors-check-validity');
                
                if (!$scope.optOutDirectMail.$invalid) {
                    console.log("user submit");
                    window.location.href="thank-you-request.aspx";
>>>>>>> e5d5592d9cd02840e9a7eac4ea6e7ead7af3e8fb
                }
            };
        }])

        .controller('allController', ['$scope', function($scope) {
            $scope.submitted = false;
        
            $scope.submitAll = function() {
                $scope.submitted = true;
                $scope.$broadcast('show-errors-check-validity');
                if (!$scope.optOutAll.$invalid) {
                    //alert('Successful login');
                    console.log("user submit");
                    window.location.href="thank-you-request.aspx";
                }
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
        }])


        .controller('allmailController', ['$scope', function($scope) {

            $scope.submitted = false;

            $scope.submitForm = function() {
                $scope.submitted = true;
                $scope.$broadcast('show-errors-check-validity');

                if (!$scope.optoutall.$invalid) {
                    console.log("user submit");
                    window.location.href="/hcp/thank-you-request.aspx";
                }
                else{
                    console.log("Error!");
                    //alert("Please address the errors above!")
                }

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
<<<<<<< HEAD
    
    
        //.controller('clickController', ['$scope', function($scope){
        //    $scope.clickToTY = function(){
        //        window.location.href="thank-you-request.aspx";
        //    }
        //}])

=======
>>>>>>> e5d5592d9cd02840e9a7eac4ea6e7ead7af3e8fb

}).call(this);
 
