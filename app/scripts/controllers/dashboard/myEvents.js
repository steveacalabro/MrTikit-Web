'use strict';

/**
 * @ngdoc function
 * @name mrtikitApp.controller:MainCtrl
 * @description
 * # MyEventsCtrl
 * Controller of the mrtikitApp
 */
angular.module('mrtikitApp').controller('MyEventsCtrl', function ($scope, $Event, $mdToast) {
    if ($scope.user) {
        $scope.query = {published:true,owner:$scope.user.id};
        $scope.eventsPromise = $Event.getAll($scope.user.loginKey);
        $scope.eventsPromise.then(function (events) {
            $scope.events = events;
        }, function (error) {
            $mdToast.showSimple('error');
            console.log(error);
        });
    }
});