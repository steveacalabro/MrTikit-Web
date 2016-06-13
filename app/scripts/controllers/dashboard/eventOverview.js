'use strict';

/**
 * @ngdoc function
 * @name mrtikitApp.controller:MainCtrl
 * @description
 * # EventOverviewCtrl
 * Controller of the mrtikitApp
 */
angular.module('mrtikitApp').controller('EventOverviewCtrl', function ($scope, $stateParams, $Event, $TicketType, $mdToast) {
    $scope.setEvent($stateParams.eventId);
    $scope.event = {};
    $scope.ticketTypes = [];
    
    $scope.eventPromise = $Event.get($scope.curEventId, $scope.user.loginKey);
    $scope.eventPromise.then(function (event) {
        console.log(event);
        try {
            event.location = JSON.parse(event.location);
        } catch (e) {}
        $scope.event = event;
    }, function (error) {
        console.log(error);
        $mdToast.showSimple('Event Load: Error');
    })
    
    $scope.attendees = [];
    var getTTPromise = $TicketType.getByEvent($scope.curEventId);
    getTTPromise.then(function (ticketTypes) {
        //$mdToast.showSimple('get ticket types success');
        $scope.ticketTypes = ticketTypes;
    }, function (error) {
        if (error.error) {
            $mdToast.showSimple('Error: ' + error.error);
        } else if (error.data && error.data.message) {
            $mdToast.showSimple('Error: ' + error.data.message);
        } else {
            $mdToast.showSimple('Error: Unkown')
            console.log(error);
        }
    })
});