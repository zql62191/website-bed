(function() {
    'use strict';

    angular.module('cdmp.controllers')

        .controller('signupController', ['$scope', '$http', function($scope,$http) {

            //$scope.submitted = false;
            //$scope.notMatch = false;
            //
            //$scope.submitForm = function() {
            //    $scope.submitted = true;
            //    $scope.$broadcast('show-errors-check-validity');
            //
            //    if (!$scope.optIn.$invalid) {
            //        if($scope.user.email == $scope.user.confirmEmail){
            //            $scope.notMatch = false;
            //            if($scope.checkBox==true){
            //                //alert('Successful login');
            //                //location.reload();
            //                console.log("user submit");
            //                window.location.href="thank-you.aspx";
            //            }
            //        }else{
            //            $scope.notMatch = true;
            //            console.log("not match")
            //        }
            //    }
            //    else{
            //        console.log("Error!");
            //        //alert("Please address the errors above!")
            //    }
            //    
            //};
        
            
            console.log("in controller");
            
            $scope.optForm = function() {
                
                console.log("in ajax");
                
                //var source = "0";
                
                var optInInfor = {
                    optIn: {
                        CommunicationsOptIn: true,
                        Name: {
                            FName: $scope.optInForm.FName,
                            LName: $scope.optInForm.LName,
                            },
                        Email: {
                            Email:$scope.optInForm.Email,
                            ConfirmEmail:$scope.optInForm.ConfirmEmail,
                        }
                    },
                    sourceCode: 0,
                }
                
                console.log(optInInfor);
        
        
                var URL = BEDSVC + "/SetOptInData";
                
        
                $http({
                    method: "POST",
                    crossDomain: true,
                    async: true,
                    cache: false,
                    url: URL,
                    data: optInInfor,
                    contentType: "application/json"
                })
                    
                    .success(function (data, status, headers, config) {
                        console.log("get data" + data);
                        
                        if (data.SetOptInDataResult == true) {
                            
                            $scope.submitted = false;
                            $scope.notMatch = false;

                            $scope.submitForm = function() {
                                $scope.submitted = true;
                                $scope.$broadcast('show-errors-check-validity');

                                if (!$scope.optIn.$invalid) {
                                    if($scope.user.email == $scope.user.confirmEmail){
                                        $scope.notMatch = false;
                                        if($scope.checkBox==true){
                                            //alert('Successful login');
                                            //location.reload();
                                            console.log("user submit");
                                            window.location.href="thank-you.aspx";
                                        }
                                    }
                                }
                                else{
                                    $scope.notMatch = true;
                                    console.log("not match")
                                    //alert("Please address the errors above!")
                                }

                            };
                            
                            
                        } else {
                        }
                    })
                    .error(function (data, status, headers, config) {
                        console.log("Error Ajax");
                    })
            }

        }])



    

        //.directive('showErrors', function (showErrorsConfig) {
        //    var getShowSuccess;
        //    getShowSuccess = function (options) {
        //        var showSuccess;
        //        showSuccess = showErrorsConfig.showSuccess;
        //        if (options && options.showSuccess != null) {
        //            showSuccess = options.showSuccess;
        //        }
        //        return showSuccess;
        //    };
        //})

        .provider('showErrorsConfig', function () {
            var _showSuccess;
            _showSuccess = false;
            this.showSuccess = function (showSuccess) {
                return _showSuccess = showSuccess;
            };
            this.$get = function () {
                return { showSuccess: _showSuccess };
            };
        });

    
    
        var BEDSVC = "http://62c435af.ngrok.com/hcp/service/BEDService.svc"
    

}).call(this);
