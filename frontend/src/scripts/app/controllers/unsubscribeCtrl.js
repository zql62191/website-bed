(function() {
    'use strict';

    angular.module('cdmp.controllers')

        .controller('unsubController', ['$scope', function($scope) {

            $scope.submitted = false;
            $scope.notMatch = false;

            $scope.submitForm = function() {
                $scope.submitted = true;
                $scope.$broadcast('show-errors-check-validity');

                if (!$scope.optOutEmail.$invalid || !$scope.optOutDirectMail.$invalid || !$scope.optOutAll.$invalid) {
                    $scope.notMatch = false;
                    if ($scope.checkBox == true) {
                        //alert('Successful login');
                        //location.reload();
                        console.log("user submit");
                        window.location.href = "thank-you-request.aspx";
                    } else {
                        $scope.notMatch = true;
                        console.log("not match")
                        //alert("Please address the errors above!")
                    }
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
