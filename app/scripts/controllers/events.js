'use strict';

/**
 * @ngdoc function
 * @name mrtikitApp.controller:EventsCtrl
 * @description
 * # EventsCtrl
 * Controller of the mrtikitApp
 */
angular.module('mrtikitApp').controller('EventsCtrl', function ($scope, $Event, $stateParams) {
    $scope.eventsPromise = $Event.getAll($scope.user.loginKey);
    $scope.eventsPromise.then(function (events) {
        //$mdToast.showSimple('success');
        //console.log(events);
        for(var i=0;i<events.length;i++) {
            try{
                events[i].location = JSON.parse(events[i].location);
            } catch(e){
                events[i].location = {name:events[i].location};
            }
        }
        $scope.events = events;
    }, function (error) {
        $mdToast.showSimple('error');
        console.log(error);
    });
});