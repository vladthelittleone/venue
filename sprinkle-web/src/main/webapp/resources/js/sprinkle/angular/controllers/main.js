/**
 * Created by vladthelittleone on 08.06.14.
 */

angular.module('sprinkle.controllers')
    /**
     * Main controller that handle information, events related
     * with profile configurations and map configurations.
     * @controller
     */
    .controller('mainCtrl', ['$scope', '$map', '$authentication', '$redirect',
        function ($scope, $map, $authentication, $redirect) {
            $scope.mapService = $map;
            $scope.authenticationService = $authentication;

            var sprinkleMap = $map.getSprinkleMap();

            // Information form event creation form
            $scope.newEvent = {
                name: "",
                description: "",
                error: false
            };


            $scope.eventTypes = {
                sport: {
                    name: "Sport",
                    color: "#FFFFF"
                },
                science: {
                    name: "Science",
                    color: "#FFFFF"
                },
                friendship: {
                    name: "Friendship",
                    color: "#FFFFF"
                },
                music: {
                    name: "Music",
                    color: "#FFFFF"
                }
            };

            /**
             * Handle click on map.
             */
            sprinkleMap.getMap().on('click', function(e) {
                var service = $scope.mapService;

                // Check event creation on
                if (service.isEventCreationOn()) {
                    $scope.$apply(function () {
                        // Validate
                        if ($scope.newEvent.name == "" || $scope.newEvent.description == "") {
                            $scope.newEvent.error = true;
                            jQuery("#map-shake").shake(3, 7, 400);
                            return;
                        }
                        // Set event creation off
                        service.isEventCreationOn(false);

                        // Redirect to profile
                        $redirect.toProfile();

                        // Apply all changes.
                        sprinkleMap.setMarker(e.latlng.lng, e.latlng.lat, $scope.newEvent.name, $scope.newEvent.description, "large", "#ff4444", "circle-stroked");
                    });
                }
            });
        }
    ]);