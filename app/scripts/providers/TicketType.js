'use strict';

/**
 * @ngdoc service
 * @name $TicketType
 * @description
 */
angular.module('mrtikitApp').
factory('$TicketType', function ($http, $location, $timeout, $q) {

    var create = function (tokenKey, ticketType) {
        var promise = $q.defer();

        if (!tokenKey || tokenKey == "") {
            var error = {
                error: "Not logged in"
            }

            return $q.reject(error);
        }

        if (!ticketType.event || ticketType.event == "") {
            var error = {
                error: "Please enter an event"
            }

            return $q.reject(error);
        }

        if (!ticketType.name || ticketType.name == "") {
            var error = {
                error: "Please enter an ticket type name"
            }

            return $q.reject(error);
        }

        var req = {
            method: 'POST',
            url: SERVER_URL + "/v1/ticketTypes",
            headers: {
                'Content-Type': "application/json",
                'Authorization': "JWT " + tokenKey
            },
            data: {
                event: ticketType.event,
                name: ticketType.name,
                maxTickets: ticketType.maxTickets,
                price: ticketType.price,
                section: ticketType.section,
                photoTicket: ticketType.photoTicket,
                eventTime: ticketType.eventTime,
                purchaseStart: ticketType.purchaseStart,
                purchaseEnd: ticketType.purchaseEnd,
                hidden: ticketType.hidden
            }
        }

        var promise = $http(req).then(function (data) {
            return data.data.data;
        }, function (error) {
            return $q.reject(error);
        });
        return promise;
    }

    var update = function (tokenKey, ticketType) {
        var promise = $q.defer();

        if (!tokenKey || tokenKey == "") {
            var error = {
                error: "Not logged in"
            }

            return $q.reject(error);
        }

        if (!ticketType.id || ticketType.id == "") {
            var error = {
                error: "Please enter an ticketType id"
            }

            return $q.reject(error);
        }

        var req = {
            method: 'PUT',
            url: SERVER_URL + "/v1/ticketTypes/" + ticketType.id,
            headers: {
                'Content-Type': "application/json",
                'Authorization': "JWT " + tokenKey
            },
            data: {
                event: ticketType.event,
                name: ticketType.name,
                maxTickets: ticketType.maxTickets,
                price: ticketType.price,
                section: ticketType.section,
                photoTicket: ticketType.photoTicket,
                eventTime: new Date(ticketType.eventTime),
                purchaseStart: ticketType.purchaseStart,
                purchaseEnd: ticketType.purchaseEnd,
                hidden: ticketType.hidden
            }
        }

        var promise = $http(req).then(function (data) {
            return data.data.data;
        }, function (error) {
            return $q.reject(error);
        });
        return promise;
    }

    var get = function (tokenKey, id) {
        var promise = $q.defer();

        if (!tokenKey || tokenKey == "") {
            var error = {
                error: "Not logged in"
            }

            return $q.reject(error);
        }

        if (!id || id == "") {
            var error = {
                error: "Please enter an ticketType id"
            }

            return $q.reject(error);
        }

        var req = {
            method: 'GET',
            url: SERVER_URL + "/v1/ticketTypes/" + id,
            headers: {
                'Content-Type': "application/json",
                'Authorization': "JWT " + tokenKey
            }
        }

        var promise = $http(req).then(function (data) {
            return data.data.data;
        }, function (error) {
            return $q.reject(error);
        });
        return promise;
    }
    
    var getByEvent = function (eventId) {
        var promise = $q.defer();

        if (!eventId || eventId == "") {
            var error = {
                error: "Please enter an event id"
            }

            return $q.reject(error);
        }

        var req = {
            method: 'POST',
            url: SERVER_URL + "/v1/ticketTypes/getTicketTypesByEvent",
            headers: {
                'Content-Type': "application/json",
            },
            data: {
                eventId : eventId
            }
        }

        var promise = $http(req).then(function (data) {
            return data.data.data;
        }, function (error) {
            return $q.reject(error);
        });
        return promise;
    }

    return {
        create: function (tokenKey, ticketType) {
            return create(tokenKey, ticketType);
        },
        update: function (tokenKey, ticketType) {
            return update(tokenKey, ticketType);
        },
        get: function (tokenKey, id) {
            return get(tokenKey, id);
        },
        getByEvent: function(eventId) {
            return getByEvent(eventId);
        }
    };
})