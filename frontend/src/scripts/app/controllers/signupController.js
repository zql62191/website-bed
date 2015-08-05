(function() {
    'use strict';

    angular.module('cdmp.controllers')

        .controller('signupController', ['$scope', function($scope) {

            $scope.submitted = false;
            $scope.notMatch = false;

            $scope.submitForm = function() {
                $scope.submitted = true;
                $scope.$broadcast('show-errors-check-validity');

                //$scope.optIn.firstName.$dirty = true;
                //$scope.optIn.lastName.$dirty = true;
                //$scope.optIn.email.$dirty = true;
                //$scope.optIn.confirmEmail.$dirty = true;

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
                    //alert("Please address the errors above!")
                }
            };

            //$scope.allowValidation = function () {
            //    $scope.$broadcast('kickOffValidations');
            //}

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

            //var EMAIL_REGX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
            //return {
            //    restrict: 'A',
            //    require: 'ngModel',
            //    link: function(scope, elm, attr, ctrl) {
            //
            //        if (attr.type === 'radio' || attr.type === 'checkbox') return;
            //        elm.unbind('input').unbind('keydown').unbind('change');
            //
            //        elm.bind('blur', function () {
            //            scope.$apply(dovalidation);
            //        });
            //        scope.$on('kickOffValidations', dovalidation)
            //
            //        function dovalidation() {
            //            if (EMAIL_REGX.test(elm.val())) {
            //                ctrl.$setValidity('email', true);
            //            } else {
            //                ctrl.$setValidity('email', false);
            //            }
            //        }
            //    }
            //};

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
