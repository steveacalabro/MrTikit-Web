'use strict';

/**
 * @ngdoc function
 * @name mrtikitApp.controller:SidebarCtrl
 * @description
 * # SidebarCtrl
 * Controller of the mrtikitApp
 */
angular.module('mrtikitApp').controller('SidebarCtrl', function ($scope) {
    //console.log('sidebar');
    $scope.sideAdminLinks = [{
        "icon": "calendar-o",
        "text": "My Events"
    },
    {
        "icon": "calendar-plus-o",
        "text": "Create Events"
    }];
});