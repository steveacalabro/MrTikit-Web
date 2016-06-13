'use strict';

/**
 * @ngdoc function
 * @name mrtikitApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the mrtikitApp
 */
angular.module('mrtikitApp').controller('LoginCtrl', function ($scope, $rootScope, $User, $mdToast, $cookieStore, $location, Facebook) {
    $scope.returnPath = $scope.previousPage;
    $scope.defaultpath = "/dashboard";
    $scope.login = function () {
        if ($scope.email && $scope.password) {
            $User.login($scope.email, $scope.password).then(function (data) {
                $cookieStore.put('loginKey', data.data.data.token);
                $cookieStore.put('user', data.data.data.user);
                $cookieStore.put('loginType', "email");

                $rootScope.user = $cookieStore.get("user");
                $rootScope.user.loginKey = $cookieStore.get("loginKey");
                $rootScope.user.loginType = $cookieStore.get("loginType");
                if ($scope.previousPage) {
                    $location.path($scope.previousPage);
                } else {
                    $location.path($scope.defaultpath);
                }
            },
            function (error) {
                if (error.error) {
                    $mdToast.showSimple(error.error);
                } else if (error.status == 401) {
                    $mdToast.showSimple(error.data.message);
                } else {
                    console.log(error);
                }
            });
        }
    }

    $scope.fbLogin = function () {
        Facebook.login(function (response) {
            // Do something with response.
            if (response.status == "connected") {
                console.log(response.authResponse.accessToken);
                $User.facebookLogin(response.authResponse.accessToken).then(function (data) {
                    $cookieStore.put('loginKey', data.data.data.token);
                    $cookieStore.put('user', data.data.data.user);
                    $cookieStore.put('loginType', "facebook");

                    $rootScope.user = $cookieStore.get("user");
                    $rootScope.user.loginKey = $cookieStore.get("loginKey");
                    $rootScope.user.loginType = $cookieStore.get("loginType");

                    if ($scope.previousPage) {
                        $location.path($scope.previousPage);
                    } else {
                        $location.path($scope.defaultpath);
                    }
                },
                function (error) {
                    if (error.error) {
                        $mdToast.showSimple(error.error);
                    } else if (error.status == 401) {
                        $mdToast.showSimple(error.data.message);
                    } else {
                        console.log(error);
                    }
                });

            }
        }, {
            scope: ['user_events', 'user_posts', 'publish_actions', 'email']
        });
        /*FB.login(function(response) {
            // handle the response
            
        }, {scope: 'public_profile,email'});*/
    }
});