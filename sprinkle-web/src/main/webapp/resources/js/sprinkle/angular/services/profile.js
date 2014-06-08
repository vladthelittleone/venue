/**
 * Created by vladthelittleone on 08.06.14.
 */

angular.module('sprinkle.services')
    /**
     * Service that responding for profile configurations.
     */
    .factory('$profile',
        function () {
            return {
                // true - user can click on map and create event, false - can't.
                isEventCreationOn: function () {
                    return localStorage.getItem('eventCreation') === 'true';
                },
                eventCreationOn: function (b) {
                    localStorage.setItem('eventCreation', b);
                },
                isEventPlaced: false
            };
    });