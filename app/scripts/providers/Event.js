'use strict';

/**
 * @ngdoc service
 * @name $Event
 * @description
 */
angular.module('mrtikitApp').
factory('$Event', function ($http, $location, $timeout, $q) {

    var create = function (tokenKey, event) {
        var promise = $q.defer();

        if (!tokenKey || tokenKey == "") {
            var error = {
                error: "Not logged in"
            }

            return $q.reject(error);
        }

        if (!event.title || event.title == "") {
            var error = {
                error: "Please enter an event Title"
            }

            return $q.reject(error);
        }

        if (!event.owner || event.owner == "") {
            var error = {
                error: "Please enter an event owner"
            }

            return $q.reject(error);
        }
        /*if (!event.paypalEmail || event.paypalEmail=="") {
            var error = { error: "Please eneter a paypal email"};
            return $q.reject(error);
        }*/

        var req = {
            method: 'POST',
            url: SERVER_URL + "/v1/events",
            headers: {
                'Content-Type': "application/json",
                'Authorization': "JWT " + tokenKey
            },
            data: {
                title: event.title,
                owner: event.owner,
                paypalEmail: event.paypalEmail,
                location: event.location,
                startDateTime: event.startDateTime,
                endDateTime: event.endDateTime,
                checkIn: event.checkIn,
                facebookId: event.facebookId,
                description: event.description,
                photo: event.photo
            }
        }

        var promise = $http(req).then(function (data) {
            return data.data.data;
        }, function (error) {
            return $q.reject(error);
        });
        return promise;
    }

    var update = function (tokenKey, event) {
        var promise = $q.defer();

        if (!tokenKey || tokenKey == "") {
            var error = {
                error: "Not logged in"
            }

            return $q.reject(error);
        }

        if (!event.id || event.id == "") {
            var error = {
                error: "Please enter an event id"
            }

            return $q.reject(error);
        }

        if (!event.paypalEmail || event.paypalEmail == "") {
            var error = {
                error: "Please eneter a paypal email"
            };
            return $q.reject(error);
        }

        var req = {
            method: 'PUT',
            url: SERVER_URL + "/v1/events/" + event.id,
            headers: {
                'Content-Type': "application/json",
                'Authorization': "JWT " + tokenKey
            },
            data: {
                title: event.title,
                owner: event.owner,
                paypalEmail: event.paypalEmail,
                location: event.location,
                startDateTime: event.startDateTime,
                endDateTime: event.endDateTime,
                checkIn: event.checkIn,
                published: event.published,
                description: event.description
            }
        }

        var promise = $http(req).then(function (data) {
            return data.data.data;
        }, function (error) {
            return $q.reject(error);
        });
        return promise;
    }

    var getAll = function (tokenKey) {

        if (!tokenKey || tokenKey == "") {
            var error = {
                error: "Not logged in"
            }

            return $q.reject(error);
        }

        var req = {
            method: 'GET',
            url: SERVER_URL + "/v1/events",
            headers: {
                'Content-Type': "application/json",
                'Authorization': "JWT " + tokenKey
            }
        }
        var promise = $http(req).then(function (data) {
            return data.data.data
        }, function (error) {
            return $q.reject(error);
        });
        return promise;
    }

    var publicGetAll = function (tokenKey) {

        if (!tokenKey || tokenKey == "") {
            var error = {
                error: "Not logged in"
            }

            return $q.reject(error);
        }

        var req = {
            method: 'GET',
            url: SERVER_URL + "/v1/consumer/getEvents/",
            headers: {
                'Content-Type': "application/json",
                'Authorization': "JWT " + tokenKey
            }
        }
        var promise = $http(req).then(function (data) {
            return data.data.data
        }, function (error) {
            return $q.reject(error);
        });
        return promise;
    }

    var get = function (id, tokenKey) {
        var promise = $q.defer();

        if (!tokenKey || tokenKey == "") {
            var error = {
                error: "Not logged in"
            }

            return $q.reject(error);
        }

        if (!id || id == "") {
            var error = {
                error: "Please enter an event id"
            }

            return $q.reject(error);
        }

        var req = {
            method: 'GET',
            url: SERVER_URL + "/v1/events/" + id,
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

    var publicGet = function (id, tokenKey) {
        var promise = $q.defer();

        if (!tokenKey || tokenKey == "") {
            var error = {
                error: "Not logged in"
            }

            return $q.reject(error);
        }

        if (!id || id == "") {
            var error = {
                error: "Please enter an event id"
            }

            return $q.reject(error);
        }

        var req = {
            method: 'GET',
            url: SERVER_URL + "/v1/events/" + id,
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

    var holdTicket = function (tokenKey, event, ticketType, qty) {
        var promise = $q.defer();

        if (!tokenKey || tokenKey == "") {
            var error = {
                error: "Not logged in"
            }

            return $q.reject(error);
        }

        if (!event || event == "") {
            var error = {
                error: "Please enter an event id"
            }

            return $q.reject(error);
        }

        if (!ticketType || ticketType == "") {
            var error = {
                error: "Please enter a ticketType"
            }

            return $q.reject(error);
        }

        if (!qty || qty == "") {
            var error = {
                error: "Please enter a qty"
            }

            return $q.reject(error);
        }

        var req = {
            method: 'POST',
            url: SERVER_URL + "/v1/events/holdTicket",
            headers: {
                'Content-Type': "application/json",
                'Authorization': "JWT " + tokenKey
            },
            data: {
                eventId: event,
                ticketTypeId: ticketType,
                qty: qty
            }
        }

        var promise = $http(req).then(function (data) {
            return data.data.data;
        }, function (error) {
            return $q.reject(error);
        });
        return promise;
    }

    var purchaseTicket = function (tokenKey, transactionId) {
        var promise = $q.defer();

        if (!tokenKey || tokenKey == "") {
            var error = {
                error: "Not logged in"
            }

            return $q.reject(error);
        }

        if (!transactionId || transactionId == "") {
            var error = {
                error: "No transaction Id"
            }

            return $q.reject(error);
        }

        var req = {
            method: 'POST',
            url: SERVER_URL + "/v1/events/purchaseTicket",
            headers: {
                'Content-Type': "application/json",
                'Authorization': "JWT " + tokenKey
            },
            data: {
                transactionId: transactionId

            }
        }

        var promise = $http(req).then(function (data) {
            return data.data.data;
        }, function (error) {
            return $q.reject(error);
        });
        return promise;
    }


    var getFacebookFeed = function (eventId, fbToken) {
        var promise = $q.defer();

        if (!eventId || eventId == "") {
            var error = {
                error: "No Facbook Event ID"
            }

            return $q.reject(error);
        }

        if (!fbToken || fbToken == "") {
            var error = {
                error: "No Facbook token"
            }

            return $q.reject(error);
        }

        var req = {
            method: 'GET',
            url: "https://graph.facebook.com/" + eventId + "/feed?access_token=" + fbToken,
        }

        var promise = $http(req).then(function (data) {
            return data;
        }, function (error) {
            return $q.reject(error);
        });
        return promise;
    }

    var postFacebookFeed = function (eventId, fbToken, message) {
        var promise = $q.defer();

        if (!eventId || eventId == "") {
            var error = {
                error: "No Facbook Event ID"
            }

            return $q.reject(error);
        }

        if (!fbToken || fbToken == "") {
            var error = {
                error: "No Facbook token"
            }

            return $q.reject(error);
        }

        if (!message || message == "") {
            var error = {
                error: "No message"
            }

            return $q.reject(error);
        }

        var req = {
            method: 'POST',
            url: "https://graph.facebook.com/" + eventId + "/feed?access_token=" + fbToken,
            data: {
                message: message
            }
        }

        var promise = $http(req).then(function (data) {
            return data;
        }, function (error) {
            return $q.reject(error);
        });
        return promise;
    }

    var getFacebookCoverPhoto = function (eventId, fbToken) {
        var promise = $q.defer();

        if (!eventId || eventId == "") {
            var error = {
                error: "No Facbook Event ID"
            }

            return $q.reject(error);
        }

        var req = {
            method: 'GET',
            url: "https://graph.facebook.com/" + eventId + "?fields=cover&access_token=" + fbToken,
        }

        var promise = $http(req).then(function (data) {
            return data;
        }, function (error) {
            return $q.reject(error);
        });
        return promise;
    }

    return {
        create: function (tokenKey, event) {
            return create(tokenKey, event);
        },
        update: function (tokenKey, event) {
            return update(tokenKey, event);
        },
        getAll: function (tokenKey) {
            return getAll(tokenKey);
        },
        get: function (tokenKey, event) {
            return get(tokenKey, event);
        },
        publicGetAll: function () {
            return publicGetAll("tokenKey");
        },
        publicGet: function (event) {
            return publicGet(event, "tokenKey");
        },
        holdTicket: function (tokenKey, event, ticketType, qty) {
            return holdTicket(tokenKey, event, ticketType, qty);
        },
        purchaseTicket: function (tokenKey, transactionId) {
            return purchaseTicket(tokenKey, transactionId);
        },
        getFacebookFeed: function (eventId, fbToken) {
            return getFacebookFeed(eventId, fbToken);
        },
        postFacebookFeed: function (eventId, fbToken, message) {
            return postFacebookFeed(eventId, fbToken, message);
        },
        getFacebookCoverPhoto: function (eventId, fbToken) {
            return getFacebookCoverPhoto(eventId, fbToken);
        },
    };
})