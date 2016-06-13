'use strict';

/**
 * @ngdoc function
 * @name mrtikitApp.controller:EventCreatePublishCtrl
 * @description
 * # EventCreatePublishCtrl
 * Controller of the mrtikitApp
 */
angular.module('mrtikitApp').controller('EventCreatePublishCtrl', function ($scope, $User, $Event, $mdToast, $filter,$stateParams) {
    $scope.setEvent($stateParams.eventId);
    $scope.setStep(3);
    $scope.setValidate(function() {return false;});
    $scope.event = {};
    $scope.eventPromise = $Event.get($scope.curEventId, $scope.user.loginKey);
    $scope.eventPromise.then(function (event) {
        $scope.event=event;
    }, function (error) {
        $scope.onError(error, 'Event Load Error: ')
    });
    $scope.publish = function() {
        $scope.event.published=true;
        var updatePromise = $Event.update($scope.user.loginKey, $scope.event);
        updatePromise.then(function (event) {
            $mdToast.showSimple('Event Publish: Success');
            $scope.event=event;
            $scope.go('/dashboard/myEvents');
        }, function (error) {
            $scope.onError(error, 'Event Update Error: ')
        });
    }
});