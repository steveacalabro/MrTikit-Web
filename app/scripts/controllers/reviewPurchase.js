'use strict';

/**
 * @ngdoc function
 * @name mrtikitApp.controller:ReviewPurchaseCtrl
 * @description
 * # ReviewPurchaseCtrl
 * Controller of the mrtikitApp
 */
angular.module('mrtikitApp').controller('ReviewPurchaseCtrl', function ($scope, $timeout, $window, $location, $Event) {
    $scope.loadComplete = false;
    $scope.tickets = [];
    $scope.trans = $location.search().trans;
    
    var finalizePurchase = $Event.purchaseTicket($scope.user.loginKey, $scope.trans);
    finalizePurchase.then(function (data) {
        $scope.tickets = data[0].tickets;
        $scope.loadComplete = true;
        $location.search('trans', null);
        
        $Event.get($scope.tickets[0].id, $scope.user.loginKey).then(function (data) {
            //This shouldn't do anything
            //console.log(data);
            $scope.eventTitle = data.title;
        },
        function (error) {
            console.log(error);
        });
    }, function (error) {
        console.log(error);
    });
    
    $scope.view = function (id) {
        $window.open("/myTickets/" + id + "/view", '_blank');
    }
});