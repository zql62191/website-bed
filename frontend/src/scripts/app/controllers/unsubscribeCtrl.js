(function() {
    'use strict';

    angular.module('cdmp.controllers')

        .controller('emailController', ['$scope', function($scope) {
            $scope.submitted = false;

            $scope.submitForm = function() {
                $scope.submitted = true;
                $scope.$broadcast('show-errors-check-validity');
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

}).call(this);
 
