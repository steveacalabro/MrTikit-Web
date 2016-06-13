'use strict';

/**
 * @ngdoc function
 * @name mrtikitApp.controller:EventCreateTicketTypesCtrl
 * @description
 * # EventCreateTicketTypesCtrl
 * Controller of the mrtikitApp
 */
angular.module('mrtikitApp').controller('EventCreateTicketTypesCtrl', function ($scope, $TicketType, $stateParams, $mdToast, $location) {
    $scope.setEvent($stateParams.eventId);
    $scope.setStep(2);
    $scope.setValidate(function() {
        if ($scope.numTicketTypes==0) {
            $mdToast.showSimple("Please add a Ticket Type");
            return false;
        }
        for(var i=0;i<$scope.numTicketTypes;i++) {
            if ($scope.ticketTypeForm['ttf-'+i].$dirty) {
                $mdToast.showSimple('Please save modified Ticket Type');
                return false;
            }
        }
        if($scope.ticketTypeForm['ttf-'+$scope.numTicketTypes].$dirty && $scope.ticketTypes[$scope.ticketTypes.length-1].name != '') {
            $mdToast.showSimple("Please save or delete Ticket Type");
            return false;
        }
        return true;
    });
    $scope.ticketTypes = [];
    $scope.numTicketTypes = 0;
    var getTTPromise = $TicketType.getByEvent($scope.curEventId);
    getTTPromise.then(function (ticketTypes) {
        $scope.ticketTypes = ticketTypes;
        $scope.numTicketTypes = ticketTypes.length;
        $scope.ticketTypes.push({});
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
    
    $scope.createTicketType = function(index) {
        var tt = $scope.ticketTypes[index];
        tt.event = $scope.curEventId;
        var createTTPromise = $TicketType.create($scope.user.loginKey, tt);
        createTTPromise.then(function (ticketType) {
            $mdToast.showSimple('Create ticket type success');
            $scope.ticketTypes[index] = ticketType;
            $scope.ticketTypeForm['ttf-'+index].$setPristine();
            $scope.numTicketTypes = $scope.ticketTypes.length;
            $scope.ticketTypes.push({});
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
    
    $scope.updateTicketType = function(index) {
        var tt = $scope.ticketTypes[index];
        var updateTTPromise = $TicketType.update($scope.user.loginKey, tt);
        updateTTPromise.then(function (ticketType) {
            $mdToast.showSimple('Update ticket type success');
            $scope.ticketTypes[index] = ticketType;
            $scope.ticketTypeForm['ttf-'+index].$setPristine();
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