'use strict';

/**
 * @ngdoc function
 * @name mrtikitApp.controller:MainCtrl
 * @description
 * # EventReportsCtrl
 * Controller of the mrtikitApp
 */
angular.module('mrtikitApp').controller('EventReportsCtrl', function ($scope, $stateParams) {
    $scope.setEvent($stateParams.eventId);
});