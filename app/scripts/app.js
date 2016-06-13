'use strict';

/**
 * @ngdoc overview
 * @name mrtikitApp
 * @description
 * # mrtikitApp
 *
 * Main module of the application.
 */
angular.module('mrtikitApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngMessages',
    //'ngTouch',
    'ui.router',
    'ngMaterial',
    'monospaced.qrcode',
    'uiGmapgoogle-maps',
    'facebook',
    'google.places'
  ]).config(function ($stateProvider, $urlRouterProvider, $locationProvider, FacebookProvider) {
    $stateProvider
        .state('login', {
            url: "/login",
            templateUrl: "views/login.html",
            controller: 'LoginCtrl'
        })

    .state('boxOffice', {
        url: "/boxOffice/:id",
        abstract: true, //This allows it to be a parent with nested urls
        templateUrl: "views/boxOffice/main.html",
        controller: 'BoxOfficeMainCtrl'
    })

    .state('boxOffice.home', {
        url: "",
        templateUrl: "views/boxOffice/home.html",
        controller: 'BoxOfficeHomeCtrl'
    })

    .state('boxOffice.purchase', {
        url: "/purchase",
        templateUrl: "views/boxOffice/purchase.html",
        controller: 'BoxOfficePurchaseCtrl'
    })

    .state('boxOffice.refund', {
        url: "/refund",
        templateUrl: "views/boxOffice/refund.html",
        controller: 'BoxOfficeRefundCtrl'
    })

    .state('boxOffice.scan', {
        url: "/scan",
        templateUrl: "views/boxOffice/scan.html",
        controller: 'BoxOfficeScanCtrl'
    })

    .state('boxOffice.willcall', {
        url: "/willcall",
        templateUrl: "views/boxOffice/willcall.html",
        controller: 'BoxOfficeWillCallCtrl'
    })

    .state('app', {
        url: "/",
        abstract: true, //This allows it to be a parent with nested urls
        templateUrl: "views/main.html",
        controller: 'MainCtrl'
    })

    .state('app.error', {
        url: "error",
        templateUrl: "views/error.html",
        controller: 'ErrorCtrl'
    })

    .state('app.home', {
        url: "", //This fills out the home page of the main view of the app with the content
        templateUrl: "views/home.html",
        controller: 'HomeCtrl'
    })

    .state('app.events', {
        url: "events",
        templateUrl: "views/events.html",
        controller: 'EventsCtrl'
    })

    .state('app.event', {
        url: "events/:id",
        abstract: true, //This allows it to be a parent with nested urls
        templateUrl: "views/event.html",
        controller: 'EventCtrl'
    })

    .state('app.event.home', {
        url: "",
        templateUrl: "views/events/home.html",
        controller: 'EventHomeCtrl'
    })

    .state('app.event.about', {
        url: "/about",
        templateUrl: "views/events/about.html",
        controller: 'EventAboutCtrl'
    })

    .state('app.event.location', {
        url: "/location",
        templateUrl: "views/events/location.html",
        controller: 'EventLocationCtrl'
    })

    .state('app.event.tickets', {
        url: "/tickets",
        templateUrl: "views/events/tickets.html",
        controller: 'EventTicketsCtrl'
    })

    .state('app.myTickets', {
        url: "myTickets",
        templateUrl: "views/myTickets.html",
        controller: 'MyTicketsCtrl'
    })

    .state('app.myTicketsView', {
        url: "myTickets/:ticketId/view",
        templateUrl: "views/myTicketsView.html",
        controller: 'MyTicketsViewCtrl'
    })

    .state('app.reviewPurchase', {
        url: "reviewPurchase",
        templateUrl: "views/reviewPurchase.html",
        controller: 'ReviewPurchaseCtrl'
    })

    .state('dashboard', {
        url: "/dashboard",
        abstract: true, //This allows it to be a parent with nested urls
        templateUrl: "views/dashboard/main.html",
        controller: 'DashboardMainCtrl'
    })

    .state('dashboard.error', {
        url: "/error", //This fills out the home page of the main view of the app with the content
        templateUrl: "views/dashboard/error.html",
        controller: 'DashboardErrorCtrl'
    })

    .state('dashboard.home', {
        url: "", //This fills out the home page of the main view of the app with the content
        templateUrl: "views/dashboard/home.html",
        controller: 'DashboardHomeCtrl'
    })

    .state('dashboard.myEvents', {
        url: "/myEvents",
        templateUrl: "views/dashboard/myEvents.html",
        controller: 'MyEventsCtrl'
    })

    .state('dashboard.eventCreate', {
        abstract: true,
        url: "/events/create",
        templateUrl: "views/dashboard/eventCreate/main.html",
        controller: 'EventCreateCtrl'
    })

    .state('dashboard.eventCreate.select', {
        url: "",
        templateUrl: "views/dashboard/eventCreate/select.html",
        controller: 'EventCreateSelectCtrl'
    })

    .state('dashboard.eventCreate.new', {
        url: "/new",
        templateUrl: "views/dashboard/eventCreate/new.html",
        controller: 'EventCreateNewCtrl'
    })

    .state('dashboard.eventCreate.edit', {
        url: "/:eventId/edit",
        templateUrl: "views/dashboard/eventCreate/new.html",
        controller: 'EventCreateEditCtrl'
    })

    .state('dashboard.eventCreate.ticketTypes', {
        url: "/:eventId/ticketTypes",
        templateUrl: "views/dashboard/eventCreate/ticketTypes.html",
        controller: 'EventCreateTicketTypesCtrl'
    })

    .state('dashboard.eventCreate.publish', {
        url: "/:eventId/publish",
        templateUrl: "views/dashboard/eventCreate/publish.html",
        controller: 'EventCreatePublishCtrl'
    })

    .state('dashboard.eventOverview', {
        url: "/events/:eventId/overview",
        templateUrl: "views/dashboard/eventOverview.html",
        controller: 'EventOverviewCtrl'
    })

    .state('dashboard.eventEdit', {
        url: "/events/:eventId/edit",
        templateUrl: "views/dashboard/eventEdit.html",
        controller: 'EventEditCtrl'
    })

    .state('dashboard.eventAttendees', {
        url: "/events/:eventId/attendees",
        templateUrl: "views/dashboard/eventAttendees.html",
        controller: 'EventAttendeesCtrl'
    })

    .state('dashboard.eventReports', {
        url: "/events/:eventId/reports",
        templateUrl: "views/dashboard/eventReports.html",
        controller: 'EventReportsCtrl'
    })

    .state('dashboard.eventUtilities', {
        url: "/events/:eventId/utilities",
        templateUrl: "views/dashboard/eventUtilities.html",
        controller: 'EventUtilitiesCtrl'
    })

    .state('dashboard.ticketTypeCreate', {
        url: "/events/:eventId/ticketTypes/create",
        templateUrl: "views/dashboard/ticketTypeCreate.html",
        controller: 'TicketTypeCreateCtrl'
    })

    .state('dashboard.ticketTypeEdit', {
        url: "/events/:eventId/ticketTypes/:ticketTypeId/edit",
        templateUrl: "views/dashboard/ticketTypeEdit.html",
        controller: 'TicketTypeEditCtrl'
    })

    .state('dashboard.ticketTypeManage', {
        url: "/events/:eventId/ticketTypes/manage",
        templateUrl: "views/dashboard/ticketTypeManage.html",
        controller: 'TicketTypeManageCtrl'
    })

    //$urlRouterProvider.otherwise('/');
    $urlRouterProvider.otherwise(function ($injector, $location) {
        console.log($injector);
        console.log($location);

        if ($location.path().indexOf("dashboard") > -1) {
            $location.path("/dashboard/error");
        } else if ($location.path() == "") {
            $location.path("/");
        } else {
            $location.path("/error");
        }
    });
    $locationProvider.html5Mode(true);

    FacebookProvider.init('{FACEBOOK-TOKEN}');
}).run(function ($rootScope, $state, $http, $location, $window, $timeout, $cookieStore, $User, $Event, Facebook) {
    /*
    if (!$cookieStore.get("user") || !$cookieStore.get("loginKey")) {
        $location.path("/login");
    } else {
        $rootScope.user = $cookieStore.get("user");
        $rootScope.user.loginKey = $cookieStore.get("loginKey");
        $rootScope.user.loginType = $cookieStore.get("loginType");
        //$location.path("/");
    }*/

    $rootScope.go = function (path) {
        //console.log("go: ", path);
        $location.path(path);
    }

    $rootScope.logout = function () {
        Facebook.logout(function (response) {
            // user is now logged out
        });
        $cookieStore.remove('loginKey');
        $cookieStore.remove('user');
        $location.path("/login");
    }

    /*
    $User.signup("firstName", "lastName", "username", "email@test.com", "password").then(function (data) {

        if (data.error) {
            //This is validation error if you are missing username or password
            console.log(data.error);
            return;
        }

        //Log the server response success/error
        console.log(data);
    });
    */

    /*
    $Event.getAll($rootScope.loginKey).then(function (data) {

        if (data.error) {
            //This is validation error if you are missing username or password
            console.log(data.error);
            return;
        }

        //Log the server response success/error
        console.log(data);
    });*/


    /*
    $Event.get(1, $rootScope.loginKey).then(function (data) {

        if (data.error) {
            //This is validation error if you are missing username or password
            console.log(data.error);
            return;
        }

        //Log the server response success/error
        console.log(data);
    });
    */

    /*
    $Event.create($rootScope.loginKey, "title", 1,  null, null, null, null).then(function (data) {

        if (data.error) {
            //This is validation error if you are missing username or password
            console.log(data.error);
            return;
        }gi

        //Log the server response success/error
        console.log(data);
    });*/

    /*
    $Event.update(2, $rootScope.loginKey, "Test Event 2", 1,  null, null, null, null).then(function (data) {

        if (data.error) {
            //This is validation error if you are missing username or password
            console.log(data.error);
            return;
        }

        //Log the server response success/error
        console.log(data);
    });*/


});

var getLocationObject = function (input) {
    if (input.types[0] == "premise") {
        var name = input.name;
        var eventLocation = {
            "name": name,
            "location": {
                "city": input.address_components[2].long_name,
                "country": input.address_components[5].long_name,
                "latitude": input.geometry.location.lat(),
                "longitude": input.geometry.location.lng(),
                "state": input.address_components[4].short_name,
                "street": input.formatted_address,
                "zip": input.address_components[6].long_name
            }
        }

        //console.log(eventLocation);
        return eventLocation;
    } else if (input.types[0] != "street_address") {
        var name = input.name;
        var eventLocation = {
            "name": name,
            "location": {
                "city": input.address_components[3].long_name,
                "country": input.address_components[6].long_name,
                "latitude": input.geometry.location.lat(),
                "longitude": input.geometry.location.lng(),
                "state": input.address_components[5].short_name,
                "street": input.address_components[0].long_name + " " + input.address_components[1].long_name,
                "zip": input.address_components[7].long_name
            }
        }

        //console.log(eventLocation);
        return eventLocation;
    } else {
        var name = input.formatted_address;

        var eventLocation = {
            "name": name,
            "location": {
                "city": input.address_components[3].long_name,
                "country": input.address_components[6].long_name,
                "latitude": input.geometry.location.lat(),
                "longitude": input.geometry.location.lng(),
                "state": input.address_components[5].short_name,
                "street": input.address_components[0].long_name + " " + input.address_components[1].long_name,
                "zip": input.address_components[7].long_name
            }
        }

        //console.log(eventLocation);
        return eventLocation;
    }
}

/** 
 * Global Variables
 *
 **/

var SERVER_URL = "{API-LINK}";