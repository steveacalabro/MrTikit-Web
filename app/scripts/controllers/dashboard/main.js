'use strict';

/**
 * @ngdoc function
 * @name mrtikitApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the mrtikitApp
 */
angular.module('mrtikitApp').controller('DashboardMainCtrl', function ($scope, $rootScope, $interval, $location, $state, $mdSidenav, $cookieStore, $mdDialog, $User, Facebook, $Event, $mdToast,$timeout) {
    $rootScope.curEventId;
    $rootScope.eventName;

    $rootScope.collapsed = $cookieStore.get("collapsed");
    if ($rootScope.collapsed == null) {
        $rootScope.collapsed = "";
        $cookieStore.put('collapsed', $rootScope.collapsed);
    }

    $rootScope.toggleCollapse = function () {
        if ($rootScope.collapsed == "collapsed") {
            $rootScope.collapsed = "";
            $cookieStore.put('collapsed', $rootScope.collapsed);
        } else if ($rootScope.collapsed == "") {
            $rootScope.collapsed = "collapsed";
            $cookieStore.put('collapsed', $rootScope.collapsed);
        }
    };

    //THIS NEEDS TO BE CHANGED
    $rootScope.setEvent = function (eventId) {
        if($rootScope.curEventId != eventId || !$rootScope.eventName) {
            $rootScope.curEventId = eventId;
        
            $Event.get(eventId, $rootScope.user.loginKey).then(function (data) {
                //This shouldn't do anything
                //console.log(data);
                $rootScope.eventName = data.title;
            },
            function (error) {
               console.log(error);
            });
        }
    }

    $scope.openUserMenu = function ($mdOpenMenu, ev) {
        $mdOpenMenu(ev);
    };

    if (!$cookieStore.get("user") || !$cookieStore.get("loginKey")) {
        $timeout(function(){$location.path("/login")},1);//timeout required or redirect doesn't happen
        $rootScope.previousPage=$location.path();
    } else {
        $rootScope.user = $cookieStore.get("user");
        $rootScope.user.loginKey = $cookieStore.get("loginKey");
        $rootScope.user.loginType = $cookieStore.get("loginType");


        if ($rootScope.user.loginType == "facebook") {
            Facebook.getLoginStatus(function (response) {
                if (response.status === 'connected') {
                    //console.log(response);
                } else {
                    console.log(response);
                }
            });
        }

        //confirm user is good to go
        $User.ping($rootScope.user.loginKey).then(function (data) {
                //This shouldn't do anything
            },
            function (error) {
                if (error.data.message == "invalid token") {
                    console.log("Invalid Token");

                    $rootScope.user = null;

                    $cookieStore.remove("user")
                    $cookieStore.remove("loginKey");
                    $cookieStore.remove("loginType");

                    $location.path("/login");
                } else if (error.data.message == "jwt expired") {
                    console.log("Expired User");

                    $rootScope.user = null;

                    $cookieStore.remove("user")
                    $cookieStore.remove("loginKey");
                    $cookieStore.remove("loginType");

                    $location.path("/login");
                } else {
                    console.log(error);
                }
            });

        //console.log($rootScope.user);

        //If profile picture is empty fill it
        $scope.profilePicture = function () {
            if (!$rootScope.user.photo) {
                return "images/defaultUser.png";
            }
            return $rootScope.user.photo
        }

        $scope.userName = function () {
            if (!$rootScope.user.firstName || !$rootScope.user.lastName) {
                return $rootScope.user.email;
            }
            return $rootScope.user.firstName + " " + $rootScope.user.lastName;
        }
        $scope.isCurrent = function (state) {
            return $state.current.name === state;
        }
    }

});

/*
.directive('noProfilePic', function() {
  return {
    link: function(scope, element, attrs) {
      element.bind('error', function() {
        if (attrs.src != attrs.errSrc) {
          attrs.$set('src', "");
        }
      });
    }
  }
});*/