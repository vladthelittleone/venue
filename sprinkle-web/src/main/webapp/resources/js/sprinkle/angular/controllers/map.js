/**
 * Created by vladthelittleone on 08.06.14.
 */

angular.module('sprinkle.controllers')
    /**
     * Map controller that responding for map configurations.
     * @controller
     */
    .controller('mapCtrl', ['$scope', '$authentication', '$profile',
        function ($scope, $authentication, $profile) {
            $scope.authenticationService = $authentication;
            $scope.profileService = $profile;

            // Load map
            var sprinkleMap = new SprinkleMap();
            var map = sprinkleMap.getMap();

            // Set setting panel to bottom left position
            map.zoomControl.setPosition('bottomleft');

            /**
             * Handle click on map.
             */
            map.on('click', function(e) {
                var service = $scope.profileService;
                // Profile service.
                if (service.isEventCreationOn()) {
                    $scope.$apply(function () {
                        service.eventCreationOn(false);
                        service.isEventPlaced = true;
                    });
                    // Apply all changes.
                    sprinkleMap.setMarker(e.latlng.lng, e.latlng.lat, "Bicycle", "Friends, let's go cycling!", "large", "#ff4444", "circle-stroked");
                }
            });
        }
    ]);