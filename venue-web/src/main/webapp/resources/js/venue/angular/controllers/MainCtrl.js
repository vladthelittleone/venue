'use strict';

/**
 * Created by vladthelittleone on 01.11.14.
 */
angular.module('venue.controllers')

    /**
     * Controller that handle body content.
     * @controller
     */
    .controller('mainCtrl', ['$scope', '$authentication', '$connection', '$map',

        function ($scope, $authentication, $connection, $map) {

            // -------------------------------
            // -------------------------------

            $scope.authenticationService = $authentication;

            // Initialize map
            var venueMap = $map.getVenueMap();

            var isEventCreationOpen = false;

            /**
             * Information about new event.
             */
            $scope.newEvent = {

                name: "",

                description: "",

                type: null

            };

            /**
             * Get types of event from server.
             */
            $connection.httpGetTypes()

                .success(function (types) {

                             $scope.eventTypes = types;

                         });

            // -------------------------------
            // -------------------------------

            /**
             * Function open event creation.
             * @see map service
             */
            $scope.openEventCreation = function () {

                isEventCreationOpen = true;

            };

            /**
             * Function close event creation.
             * @see map service
             */
            $scope.closeEventCreation = function () {

                isEventCreationOpen = false;

                // Refreshing data
                $scope.newEvent.name = "";

                $scope.newEvent.description = "";

                $scope.newEvent.type = null;

            };

            /**
             * @returns {boolean}
             */
            $scope.isEventCreationOpen = function () {

                return isEventCreationOpen;

            };

            /**
             * Set type of event.
             * @param type - event type.
             */
            $scope.setTypeOfNewEvent = function (type) {

                $scope.newEvent.type = type;

            };

            /**
             * Return type name of new event.
             * If type equals null, then return "Select event type".
             * @returns {string}
             */
            $scope.getSelectedType = function () {

                var t = $scope.newEvent.type;

                if (t != null) {

                    return t.name;

                } else {

                    return "Select event type";

                }

            };

            /**
             * Return color of event marker.
             * If type equals null, then return "black".
             * @returns {string}
             */
            $scope.getColor = function () {

                var t = $scope.newEvent.type;

                if (t != null) {

                    return t.color;

                } else {

                    return "#5ea2af";

                }

            };

            /**
             * Handle click on map.
             */
            venueMap.getMap().on('click', function (e) {
                if (isEventCreationOpen) {
                    $scope.$apply(function () {

                        // Validate fields
                        if ($scope.newEvent.name == ""

                            || $scope.newEvent.description == ""

                            || $scope.newEvent.type == null) {

                            // TODO
                            // add some alert
                            return;

                        }

                        var m = $scope.newEvent;

                        // Apply all changes and add marker on map.
                        if (venueMap.setMarker($connection, e.latlng.lng, e.latlng.lat,

                                               m.name, m.description, "large", m.type)) {

                            // If request from service is true, then
                            // set event creation off
                            $scope.closeEventCreation();

                        } else {

                            // TODO
                            // Else shake content

                        }

                    });

                }

            });

            /**
             * Function for logout button,
             * clear localStorage and logout from server.
             */
            $scope.logout = function () {

                $connection.httpLogout().

                    success(function () {

                                $authentication.logout();

                                $connection.redirect.toSignIn();

                            });

            };

        }

    ]);