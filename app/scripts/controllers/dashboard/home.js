'use strict';

/**
 * @ngdoc function
 * @name mrtikitApp.controller:DashboardHomeCtrl
 * @description
 * # DashboardHomeCtrl
 * Controller of the mrtikitApp
 */
angular.module('mrtikitApp').controller('DashboardHomeCtrl', function ($location, $scope) {
    $scope.go('/dashboard/myEvents');
});