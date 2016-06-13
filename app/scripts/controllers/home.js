'use strict';

/**
 * @ngdoc function
 * @name mrtikitApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the mrtikitApp
 */
angular.module('mrtikitApp').controller('HomeCtrl', function ($scope, $http) {
    $scope.createEvent = function () {
        $scope.go('dashboard/events/create');
    };
    
    $scope.tour = [];
    $http.get('copy/home.json').success(function (data) {
        $scope.tour = data.tour;
    });
    
    $scope.tourIndex = 0;
    $scope.prev = function () {
        if ($scope.tourIndex === 0) {
            $scope.tourIndex = $scope.tour.length - 1;
        } else {
            $scope.tourIndex = $scope.tourIndex - 1;
        }
    }
    
    $scope.next = function () {
        $scope.tourIndex = ($scope.tourIndex + 1) % $scope.tour.length;
    }
    
    $scope.learnMore = function () {
        console.log('Learn More: ' + $scope.tour[$scope.tourIndex].title);
    }
    
    $scope.subscribe = function (email) {
        console.log('Subscribe: ' + email);
    }
});