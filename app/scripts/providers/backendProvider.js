angular.module('mrtikitApp').factory("$backend", function ($http, $q) {
    var events = [
        {
            'eventId': 1,
            'name': 'Event 1',
            'image': 'http://placehold.it/1000x200/8565c4/ffffff?text=Event+1+Image'
        },
        {
            'eventId': 2,
            'name': 'Event 2',
            'image': 'http://placehold.it/1000x200/8565c4/ffffff?text=Event+2+Image'
        },
        {
            'eventId': 3,
            'name': 'Event 3',
            'image': 'http://placehold.it/1000x200/8565c4/ffffff?text=Event+3+Image'
        },
        {
            'eventId': 4,
            'name': 'Event 4',
            'image': 'http://placehold.it/1000x200/8565c4/ffffff?text=Event+4+Image'
        },
        {
            'eventId': 5,
            'name': 'Event 5',
            'image': 'http://placehold.it/1000x200/8565c4/ffffff?text=Event+5+Image'
        },
        {
            'eventId': 6,
            'name': 'Event 6',
            'image': 'http://placehold.it/1000x200/8565c4/ffffff?text=Event+6+Image'
        },
        {
            'eventId': 7,
            'name': 'Event 7',
            'image': 'http://placehold.it/1000x200/8565c4/ffffff?text=Event+7+Image'
        },
        {
            'eventId': 8,
            'name': 'Event 8',
            'image': 'http://placehold.it/1000x200/8565c4/ffffff?text=Event+8+Image'
        },
        {
            'eventId': 9,
            'name': 'Event 9',
            'image': 'http://placehold.it/1000x200/8565c4/ffffff?text=Event+9+Image'
        },
        {
            'eventId': 10,
            'name': 'Event 10',
            'image': 'http://placehold.it/1000x200/8565c4/ffffff?text=Event+10+Image'
        }];

    var attendees = [{
        'name': 'Bob Barker'
        }, {
        'name': 'Steve Harvey'
        }, {
        'name': 'Vana White'
        }, {
        'name': 'Drew Carey'
        }, {
        'name': 'Alex Trebec'
        }, {
        'name': 'Pat Sajak'
        }, {
        'name': 'Bob Barker'
        }, {
        'name': 'Steve Harvey'
        }, {
        'name': 'Vana White'
        }, {
        'name': 'Drew Carey'
        }, {
        'name': 'Alex Trebec'
        }, {
        'name': 'Pat Sajak'
        }];

    var getEvents = function () {
        return events;
    };

    var getEvent = function (eventId) {
        if (eventId < 1 || eventId > events.length)
            return false;
        else
            return events[eventId - 1];
    };

    var getAttendees = function (eventId) {
        return attendees;
    }

    return {
        getEvents: function () {
            return getEvents();
        },
        getEvent: function (eventId) {
            return getEvent(eventId);
        },
        getAttendees: function (eventId) {
            return getAttendees(eventId);
        }
    }
});