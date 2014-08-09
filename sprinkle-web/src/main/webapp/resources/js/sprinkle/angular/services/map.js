/**
 * Created by vladthelittleone on 08.06.14.
 */

angular.module('sprinkle.services')
    /**
     * Service that responding for map configurations.
     * Initialize map using class SprinkleMap.
     *
     * @see {@link SprinkleMap}
     */
    .factory('$map',
        function () {
            // Initialize map
            var sprinkleMap = new SprinkleMap();
            var map = sprinkleMap.getMap();
            var isEventCreationOn = false;

            // Set setting panel to bottom left position
            // map.zoomControl.setPosition('bottomright');

            return {
                // true - user can click on map and create event, false - can't.
                isEventCreationOn: function () {
                    return isEventCreationOn;
                },
                setEventCreationOn: function (b) {
                    isEventCreationOn = b;
                },
                getSprinkleMap: function () {
                    return sprinkleMap;
                }
            };
    });