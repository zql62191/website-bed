/**
 * Created by cjiao on 7/31/15.
 */

(function (){
    'use strict';
    angular
        .module('cmp')
        .controller('RegisterController', RegisterController);
    
    RegisterController.$inject = ['UserService', '$location', '$rootScope', 'FlashService'];
    function RegisterController(UserService, $location, $rootScope, FlashService) {
        var cj = this;

        cj.register = register;

        function register() {
            cj.dataLoading = true;
            UserService.Create(cj.user)
                .then(function (response) {
                    if (response.success) {
                        FlashService.Success('Registration successful', true);
                        $location.path('/login');
                    } else {
                        FlashService.Error(response.message);
                        cj.dataLoading = false;
                    }
                });
        }
    }

})();

