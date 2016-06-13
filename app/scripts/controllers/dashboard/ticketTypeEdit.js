'use strict';

/**
 * @ngdoc function
 * @name mrtikitApp.controller:TicketTypeEditCtrl
 * @description
 * # TicketTypeEditCtrl
 * Controller of the mrtikitApp
 */
angular.module('mrtikitApp').controller('TicketTypeEditCtrl', function ($scope, $TicketType, $stateParams, $mdToast,$location) {
    $scope.setEvent($stateParams.eventId);
    $scope.ticketType = {};
    
    $scope.getTTPromise = $TicketType.get($scope.user.loginKey, $stateParams.ticketTypeId);
    $scope.getTTPromise.then(function (ticketType) {
        $scope.ticketType = ticketType;
    }, function (error) {
        if (error.error) {
            $mdToast.showSimple('Error: ' + error.error);
        } else if (error.data && error.data.message) {
            $mdToast.showSimple('Error: ' + error.data.message);
        } else {
            $mdToast.showSimple('Error: Unkown')
            console.log(error);
        }
    });
    
    $scope.updateTicketType = function () {
        $scope.ticketType.eventId = $scope.curEventId;
        var updateTTPromise = $TicketType.update($scope.user.loginKey, $scope.ticketType);
        updateTTPromise.then(function (ticketType) {
            $mdToast.showSimple('Update ticket type success');
            $scope.ticketType = ticketType;
            $location.path('/dashboard/events/'+$scope.curEventId+'/ticketTypes/manage');
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
    };
});