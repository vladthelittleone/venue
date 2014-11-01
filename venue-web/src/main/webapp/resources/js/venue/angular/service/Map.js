/**
 * Created by vladthelittleone on 01.11.14.
 */
angular.module('venue.services')

    /**
     * Service that responding for map configurations.
     * Initialize map using class VenueMap.
     *
     * @see {@link VenueMap}
     */
    .factory('$map',

         function () {

             // Initialize map
             var venueMap = new VenueMap();

             var map = venueMap.getMap();

             return {

                 getVenueMap: function () {

                     return venueMap;

                 }

             };

         });