/**
 * Created by vladthelittleone on 08.06.14.
 */

angular.module('sprinkle.controllers')
/**
 * Controller that handle new event operation.
 * @controller
 */
    .controller('createEventCtrl', ['$scope', '$map', '$authentication', '$url', '$http', '$animation',
        function ($scope, $map, $authentication, $url, $http, $animation) {
            $scope.mapService = $map;
            $scope.authenticationService = $authentication;

            var sprinkleMap = $map.getSprinkleMap();

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
            $http.get($url.resources.types).success(function (types) {
                $scope.eventTypes = types;
            });

            /**
             * Function redirect user to profile and switch creation off.
             * @see map service
             */
            $scope.closeEventCreation = function () {
                $map.setEventCreationOn(false);
                $url.redirect.toProfile();
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
            sprinkleMap.getMap().on('click', function (e) {
                var service = $scope.mapService;

                // Check event creation on
                if (service.isEventCreationOn()) {
                    $scope.$apply(function () {
                        // Validate fields
                        if ($scope.newEvent.name == ""
                            || $scope.newEvent.description == ""
                            || $scope.newEvent.type == null) {
                            // TODO shake or something another
                            return;
                        }

                        var m = $scope.newEvent;

                        // Apply all changes and add marker on map.
                        if (sprinkleMap.setMarker($url.setEvent, e.latlng.lng, e.latlng.lat,
                            m.name, m.description, "large", m.type)) {
                            // If request from service is true, then
                            // set event creation off
                            service.isEventCreationOn(false);

                            // And redirect to profile
                            $url.redirect.toProfile();
                        } else {
                            // Else shake content TODO
                        }
                    });
                }
            });
        }
    ]);