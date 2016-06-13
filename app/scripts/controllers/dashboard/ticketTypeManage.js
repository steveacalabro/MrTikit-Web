'use strict';

/**
 * @ngdoc function
 * @name mrtikitApp.controller:TicketTypeManageCtrl
 * @description
 * # TicketTypeManageCtrl
 * Controller of the mrtikitApp
 */
angular.module('mrtikitApp').controller('TicketTypeManageCtrl', function ($scope, $TicketType, $stateParams, $mdToast, $location) {
    $scope.setEvent($stateParams.eventId);
    $scope.ticketTypes = []; //[{id:1, event: 42,name: 'gen admin' , maxTicket: 34 },{id:2, event: 42,name: 'vip' , maxTicket: 12 }];
    
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
    
    $scope.add = function() {
        $location.path('dashboard/events/'+$scope.curEventId+'/ticketTypes/create');
    }
    
    $scope.editTicketType = function(id) {
        $location.path('dashboard/events/'+$scope.curEventId+'/ticketTypes/'+id+'/edit');
    }
    
});