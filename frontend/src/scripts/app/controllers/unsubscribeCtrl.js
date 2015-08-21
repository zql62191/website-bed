(function() {
    'use strict';

    angular.module('cdmp.controllers')


        .controller('emailController', ['$scope', '$http', function($scope,$http) {

            $scope.submitted = false;

            $scope.submitForm = function() {
                $scope.submitted = true;
                //$scope.$broadcast('show-errors-check-validity'); // uses the provider service

                if (!$scope.optOutEmail.$invalid) {
                    console.log("user submit");

                    $scope.optOutEmailForm = function() {

                        console.log("in ajax");

                        var optOutInfor = {
                              email: {
                                Email:$scope.optOutEmail.Email,
                                ConfirmEmail:$scope.optOutEmail.Email
                            },
                            sourceCode: "0"
                        };


                        console.log(JSON.stringify(optOutInfor));


                        var URL = BEDSVC + "/SetUnsubscribeDataEmail";

                        console.log(URL);

                        $http({
                            method: "POST",
                            crossDomain: true,
                            catch:false,
                            url: URL,
                            data: optOutInfor,
                            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                            dataType: "json"
                        })

                            .success(function (data, status, headers, config) {
                                console.log("get data" + data);

                                if (data.SvcStatus == true) {

                                    window.location.href="thank-you-request.aspx";

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
            };

            $scope.syncFields = function(e){
                //the original
                var thisfield = angular.element(e.currentTarget);
                var name = thisfield.prop('name');

                var others = angular.element("input[name='" + name + "'], select[name='" + name + "']");
                others.val( thisfield.val() );
            };

        }])
        
        .controller('directmailController', ['$scope',"$http", function($scope,$http) {

            $scope.submitted = false;

            $scope.submitForm = function() {
                $scope.submitted = true;
                //$scope.$broadcast('show-errors-check-validity');

                if (!$scope.optoutdirectmail.$invalid) {
                    console.log("user submit");

                    $scope.optoutdirectmailForm = function() {

                        console.log("in ajax");

                        var optDirectInfor = {
                            email: {
                                Email:$scope.optoutdirectmail.Email,
                                ConfirmEmail:$scope.optoutdirectmail.Email
                            },
                            address:{
                                FName:$scope.optoutdirectmail.FName,
                                MName:"",
                                LName:$scope.optoutdirectmail.LName,
                                Address1:$scope.optoutdirectmail.Address1,
                                Address2:$scope.optoutdirectmail.Address2,
                                City:$scope.optoutdirectmail.City,
                                State:$scope.optoutdirectmail.State,
                                Zip:$scope.optoutdirectmail.Zip
                            },
                            sourceCode: "0"
                        };


                        console.log(JSON.stringify(optDirectInfor));


                        var URL = BEDSVC + "/SetUnsubscribeDataAddress";

                        console.log(URL);

                        $http({
                            method: "POST",
                            crossDomain: true,
                            catch:false,
                            url: URL,
                            data: optDirectInfor,
                            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                            dataType: "json"
                        })

                            .success(function (data, status, headers, config) {
                                console.log("get data" + data);

                                if (data.SvcStatus == true) {

                                    window.location.href="thank-you-request.aspx";

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


        .controller('allmailController', ['$scope','$http', function($scope,$http) {

            $scope.submitted = false;

            $scope.submitForm = function() {
                $scope.submitted = true;
                //$scope.$broadcast('show-errors-check-validity');

                if (!$scope.optinall.$invalid) {
                    console.log("user submit");

                    $scope.optinallForm = function() {

                        console.log("in ajax");

                        var optAllInfor = {
                            email: {
                                Email:$scope.optinall.Email,
                                ConfirmEmail:$scope.optinall.Email
                            },
                            address:{
                                FName:$scope.optinall.FName,
                                MName:"",
                                LName:$scope.optinall.LName,
                                Address1:$scope.optinall.Address1,
                                Address2:$scope.optinall.Address2,
                                City:$scope.optinall.City,
                                State:$scope.optinall.State,
                                Zip:$scope.optinall.Zip
                            },
                            sourceCode: "0"
                        };


                        console.log(JSON.stringify(optAllInfor));


                        var URL = BEDSVC + "/SetUnsubscribeDataBoth";

                        console.log(URL);

                        $http({
                            method: "POST",
                            crossDomain: true,
                            catch:false,
                            url: URL,
                            data: optAllInfor,
                            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                            dataType: "json"
                        })

                            .success(function (data, status, headers, config) {
                                console.log("get data" + data);

                                if (data.SvcStatus == true) {

                                    window.location.href="thank-you-request.aspx";

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


    var BEDSVC = "service/BEDUnsubscribe.svc"
    

}).call(this);


