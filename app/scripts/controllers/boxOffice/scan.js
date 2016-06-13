'use strict';

/**
 * @ngdoc function
 * @name mrtikitApp.controller:BoxOfficeScanCtrl
 * @description
 * # BoxOfficeScanCtrl
 * Controller of the mrtikitApp
 */
angular.module('mrtikitApp').controller('BoxOfficeScanCtrl', function ($scope, $Ticket, $timeout) {
    //console.log('home')

    $scope.scanTicket = function () {
        $Ticket.scanTicket($scope.user.loginKey, $scope.scanId).then(function (data) {
                //console.log(data);

                $scope.scanId = null;

                if (data.status != 401) {
                    $scope.showSucess = true;
                    $timeout(function () {
                        $scope.showSucess = false;
                    }, 2000);
                } else {
                    $scope.showError = true;
                    $timeout(function () {
                        $scope.showError = false;
                    }, 2000);
                }
            },
            function (error) {
                console.log(error);
            }
        );
    }

    $scope.keyPressed = function ($event) {
        var keyCode = $event.which || $event.keyCode;
        if (keyCode === 13) {
            $scope.scanTicket();
        }
    }
});