/**
 * Created by zlin on 7/29/15.
 */


(function() {
    'use strict';

    angular.module('cdmp.controllers')
        
        .controller("emailController", ['$scope', function ($scope) {
            $scope.submitEmail = function(form){
                $scope.submitted = true;
                
                if(form.$invalid){
                    return;
                }
                //alert("email is sent");
            }
        }])
    
}).call(this);



    
