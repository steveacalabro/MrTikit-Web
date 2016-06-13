'use strict';

/**
 * @ngdoc function
 * @name mrtikitApp.controller:EventCreateSelectCtrl
 * @description
 * # EventCreateSelectCtrl
 * Controller of the mrtikitApp
 */
angular.module('mrtikitApp').controller('EventCreateSelectCtrl', function ($scope, $User, $Event, $mdToast, $filter, Facebook) {
    $scope.setStep(0);
    $scope.setValidate(function(){return false;});
    $scope.events = [];
    $scope.unpublished = [];
    $scope.fbevents = [];

    $scope.eventsPromise = $Event.getAll($scope.user.loginKey);
    $scope.eventsPromise.then(function (events) {
        $scope.events = events;
        $scope.unpublished = $filter('filter')(events, {
            published: false,owner:$scope.user.id
        });
    }, function (error) {
        $mdToast.showSimple('error');
        console.log(error);
    });

    Facebook.getLoginStatus(function (response) {
        if (response.status === 'connected') {
            $User.getFacebookEvents($scope.user.facebookId, response.authResponse.accessToken).then(function (data) {
                    $scope.fbevents = data.data.data;
                },
                function (error) {
                    if (error.error) {
                        $mdToast.showSimple(error.error);
                    } else if (error.status == 401) {
                        //$mdToast.showSimple(error.data.message);
                        console.log(error);
                    } else {
                        console.log(error);
                    }
                });
        }
    });

    $scope.createfb = function (e) {
        var location = {};
        if (e.place.location) {
            location = e.place;
            delete location["id"];

            //Duplicate code here
            var newe = {
                owner: $scope.user.id,
                facebookId: e.id,
                location: JSON.stringify(location),
                startDateTime: e.start_time,
                endDateTime: e.end_time,
                description: e.description,
                title: e.name
            };
            newe.photo = "https://scontent-iad3-1.xx.fbcdn.net/hphotos-xlf1/v/t1.0-9/12813916_10208192269592004_2427574264893653872_n.jpg?oh=ee6eefb71469c2a25e76d8797e866504&oe=575A01C5";
            
            var rv = $Event.create($scope.user.loginKey, newe);
            rv.then(function (event) {
                $mdToast.showSimple('Create Event: Successful');
                $scope.go('/dashboard/events/create/' + event.id + '/edit');
            }, function (error) {
                if (error.error) {
                    $mdToast.showSimple('Create Event Error: ' + error.error);
                } else if (error.data && error.data.message) {
                    $mdToast.showSimple('Create Event Error: ' + error.data.message);
                } else {
                    $mdToast.showSimple('Create Event Error: Unknown');
                    console.log(error);
                }
            });
        } else {
            var geocoder = new google.maps.Geocoder();
            geocoder.geocode({
                "address": e.place.name
            }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK && results.length > 0) {
                    var calculatedPlace = getLocationObject(results);

                    //duplicate code
                    var newe = {
                        owner: $scope.user.id,
                        facebookId: e.id,
                        location: JSON.stringify(calculatedPlace),
                        startDateTime: e.start_time,
                        endDateTime: e.end_time,
                        description: e.description,
                        title: e.name
                    };
                    newe.photo = "https://scontent-iad3-1.xx.fbcdn.net/hphotos-xlf1/v/t1.0-9/12813916_10208192269592004_2427574264893653872_n.jpg?oh=ee6eefb71469c2a25e76d8797e866504&oe=575A01C5";
                    
                    var rv = $Event.create($scope.user.loginKey, newe);
                    rv.then(function (event) {
                        $mdToast.showSimple('Create Event: Successful');
                        $scope.go('/dashboard/events/create/' + event.id + '/edit');
                    }, function (error) {
                        if (error.error) {
                            $mdToast.showSimple('Create Event Error: ' + error.error);
                        } else if (error.data && error.data.message) {
                            $mdToast.showSimple('Create Event Error: ' + error.data.message);
                        } else {
                            $mdToast.showSimple('Create Event Error: Unknown');
                            console.log(error);
                        }
                    });
                }
            });
        }
    };
});

angular.module('mrtikitApp').filter('fbfilter', function () {
    return function (input, events) {
        var out = [];
        angular.forEach(input, function (event) {
            var found = false;
            var i = 0;
            for (i = 0; i < events.length; i++) {
                if (event.id == events[i].facebookId) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                out.push(event);
            }
        });
        return out;
    }
});