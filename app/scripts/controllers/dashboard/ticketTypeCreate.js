'use strict';

/**
 * @ngdoc function
 * @name mrtikitApp.controller:TicketTypeCreateCtrl
 * @description
 * # TicketTypeCreateCtrl
 * Controller of the mrtikitApp
 */
angular.module('mrtikitApp').controller('TicketTypeCreateCtrl', function ($scope, $TicketType, $stateParams, $mdToast, $location) {
    $scope.setEvent($stateParams.eventId);
    $scope.ticketType = {};
    
    $scope.createTicketType = function () {
        $scope.ticketType.event = $scope.curEventId;
        var createTTPromise = $TicketType.create($scope.user.loginKey, $scope.ticketType);
        createTTPromise.then(function (ticketType) {
            $mdToast.showSimple('Create ticket type success');
            $location.path('/dashboard/events/'+$scope.curEventId+'/ticketTypes/manage');
        }, function (error) {
            if (error.error) {
                $mdToast.showSimple('Error: ' + error.error);
            } else if (error.data && error.data.message) {
                $mdToast.showSimple('Error: ' + error.data.message);
                console.log(error);
            } else {
                $mdToast.showSimple('Error: Unkown')
                console.log(error);
            }
        })
    };
});