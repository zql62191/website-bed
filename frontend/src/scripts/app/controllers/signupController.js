(function() {
    'use strict';

    angular.module('cdmp.controllers')

        .controller('signupController', ['$scope', '$http', '$location',function($scope,$http, $location) {

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
                            
                            console.log("validation is right");
                            
                            $scope.optForm = function() {
                                
                                console.log("in ajax");
                                console.log($scope.optInForm.FName);
                                
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
                                };
                                
                                
                                console.log(JSON.stringify(optInInfor));
                        
                        
                                var URL = BEDSVC + "/SetOptInData";
                                
                                console.log(URL);
                                
                                $http({
                                    method: "POST",
                                    crossDomain: true,
                                    async: true,
                                    cache: false,
                                    url: URL,
                                    //data: optInInfor,
                                    contentType: "application/json"
                                })
                                    
                                    .success(function (data, status, headers, config) {
                                        console.log("get data" + data);
                                        
                                        if (data.SetOptInDataResult == true) {

                                            $location.path ('/confirmation');
                                            
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
                            console.log("not match")
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

    
    
        var BEDSVC = "http://62c435af.ngrok.com/hcp/service/BEDService.svc"
    

}).call(this);
