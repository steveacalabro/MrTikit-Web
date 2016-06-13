'use strict';

/**
 * @ngdoc function
 * @name mrtikitApp.controller:BoxOfficeMainCtrl
 * @description
 * # BoxOfficeMainCtrl
 * Controller of the mrtikitApp
 */
angular.module('mrtikitApp').controller('BoxOfficeMainCtrl', function ($rootScope, $stateParams, $scope, $state, $location, $cookieStore) {
    $scope.event = {};
    $scope.event.id = $stateParams.id;

    $scope.goBack = function () {
        if ($state.current.name == "boxOffice.home") {
            $location.path("/dashboard");
        } else {
            $location.path("/boxOffice/" + $scope.event.id);
        }
    }

    $scope.backOrExit = function () {
        if ($state.current.name == "boxOffice.home") {
            return "Exit";
        } else {
            return "Back";
        }
    }

    if (!$cookieStore.get("user") || !$cookieStore.get("loginKey")) {
        //$location.path("/login");
    } else {
        $rootScope.user = $cookieStore.get("user");
        $rootScope.user.loginKey = $cookieStore.get("loginKey");
        $rootScope.user.loginType = $cookieStore.get("loginType");
    }
});