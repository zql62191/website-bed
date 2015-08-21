(function() {
    'use strict';

    angular.module('cdmp.controllers')

        .controller('signupController', ['$scope', '$http',function($scope,$http) {

            console.log("in controller");
            
            $scope.submitted = false;
            $scope.notMatch = false;
            
            $scope.submitForm = function() {
                $scope.submitted = true;
                $scope.$broadcast('show-errors-check-validity');
            
                if (!$scope.optInForm.$invalid) {
                    if($scope.optInForm.Email == $scope.optInForm.ConfirmEmail){
                        $scope.notMatch = false;
                        if($scope.checkBox==true){
                            
                            
                            console.log("validation is right");
                            
                            $scope.optForm = function() {
                                
                                console.log("in ajax");
                                console.log($scope.optInForm.FName);
                                
                                
                                var optInfor = {
                                    optInForm: {
                                        CommunicationsOptIn: true,
                                        Name: {
                                            FName: $scope.optInForm.FName,
                                            LName: $scope.optInForm.LName
                                            },
                                        Email: {
                                            Email:$scope.optInForm.Email,
                                            ConfirmEmail:$scope.optInForm.ConfirmEmail
                                        }
                                    },
                                    sourceCode: "0"
                                };
                                
                                
                                console.log(JSON.stringify(optInfor));
                        
                        
                                var URL = BEDSVC + "/SetOptInData";
                                
                                console.log(URL);
                                
                                $http({
                                    method: "POST",
                                    crossDomain: true,
                                    headers: {'X-Requested-With': 'XMLHttpRequest'},
                                    url: URL,
                                    cache: false,
                                    data: JSON.stringify(optInfor),
                                    contentType: "application/json; charset=utf8",
                                    dataType: "json"
                                })
                                    
                                    .success(function (data, status, headers, config) {
                                        console.log("get data" + data);
                                        
                                        if (data.SvcStatus == true) {

                                            window.location.href="thank-you.aspx";
                                            
                                        } else {
                                        }
                                    })
                                    .error(function (data, status, headers, config) {
                                        console.log("Error Ajax\n" + JSON.stringify(data) );
                                        console.log(JSON.stringify(status) );
                                        console.log(JSON.stringify(headers) );
                                    })
                            }
                        }
                        }else{
                            $scope.notMatch = true;
                            console.log("not match");
                        }
                    }
                    else{
                        console.log("Error!");
                        //alert("Please address the errors above!")
                    }
                    
                };

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

    
    
        var BEDSVC = "service/BEDService.svc"
    

}).call(this);
