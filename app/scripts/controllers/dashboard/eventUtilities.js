'use strict';

/**
 * @ngdoc function
 * @name mrtikitApp.controller:MainCtrl
 * @description
 * # EventUtilitiesCtrl
 * Controller of the mrtikitApp
 */
angular.module('mrtikitApp').controller('EventUtilitiesCtrl', function ($scope, $stateParams) {
    $scope.setEvent($stateParams.eventId);
});