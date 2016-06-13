'use strict';

/**
 * @ngdoc function
 * @name mrtikitApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the mrtikitApp
 */
angular.module('mrtikitApp').controller('MainCtrl', function ($scope, $cookieStore, $rootScope, $window, $document) {
    if ($cookieStore.get("user") && $cookieStore.get("loginKey")) {
        $rootScope.user = $cookieStore.get("user");
        $rootScope.user.loginKey = $cookieStore.get("loginKey");
        $rootScope.user.loginType = $cookieStore.get("loginType");
    }
    $scope.loginOrDashboard = function () {
        if ($rootScope.user) {
            $scope.goTo = "/dashboard/myEvents";
            return "Dashboard";
        } else {
            $scope.goTo = "/login";
            return "Login";
        }
    }
    $rootScope.$on('$locationChangeStart', function () {
        $rootScope.previousPage = location.pathname;
    });
});