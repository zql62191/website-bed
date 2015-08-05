(function() {
    'use strict';

    angular.module('cdmp.controllers')

        .controller('signupController', ['$scope', function($scope) {
            
            $scope.submitted = false;
            $scope.notMatch = false;
            
            $scope.submitForm = function() {
                $scope.submitted = true;
                $scope.$broadcast('show-errors-check-validity');
                
                if (!$scope.optIn.$invalid) {
                    if($scope.user.email == $scope.user.confirmEmail){
                        $scope.notMatch = false;
                        if($scope.checkBox==true){
                            alert('Successful login');
                            location.reload();
                            console.log("user submit")
                        }
                    }else{
                        $scope.notMatch = true;
                        console.log("not match")
                    }
                }
                else{
                    console.log("Error!");
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
