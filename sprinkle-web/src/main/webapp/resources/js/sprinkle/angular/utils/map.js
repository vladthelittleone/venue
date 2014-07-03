/**
 * Created by vladthelittleone on 29.04.14.
 * Class responding for map configurations.
 * @constructor
 */
function SprinkleMap() {
    // Construct a bounding box for this map that the user cannot
    // move out of
    var southWest = L.latLng(-90, -180),
        northEast = L.latLng(90, 180),
        bounds = L.latLngBounds(southWest, northEast);

    // Initialize mapbox
    var map = L.mapbox.map('map', 'examples.map-i86nkdio', {
        // set that bounding box as maxBounds to restrict moving the map
        // see full maxBounds documentation:
        // http://leafletjs.com/reference.html#map-maxbounds
        maxBounds: bounds,
        maxZoom: 19,
        minZoom: 2
    })
    .setView([40, -74.50], 9);

    // Create feature for markers
    var featureLayer = L.mapbox.featureLayer().addTo(map);

    // Centring
    featureLayer.on('click', function(e) {
        map.panTo(e.layer.getLatLng());
        var marker = e.layer;
        var feature = marker.feature;

        // Get angular js element
        var elem = angular.element(document);

        /**
         * Get angular js service using injector
         * to interact with framework.
         * @see url.js file.
         */
        var service = elem.injector().get('$url');

        // redirect to event
        service.redirect.toEventWithId(feature.properties.eventId);
        elem.scope().$apply();
    });

    this.getMap = function () {
        return map;
    };

    // Latitude and Longitude
    this.setMarker = function (url, lng, lat, title, description, size, type){
        $.ajax({
            type: "POST",
            async: false,
            url: url,
            data: {
                lng: lng,
                lat: lat,
                title: title,
                description: description,
                size: size,
                type: type.name
            },
            dataType: 'json',
            success: function (responce) {
                if (responce.signedIn) {
                    L.mapbox.featureLayer({
                        // this feature is in the GeoJSON format: see geojson.org
                        // for the full specification
                        type: 'Feature',
                        geometry: {
                            type: 'Point',
                            // coordinates here are in longitude, latitude order because
                            // x, y is the standard for GeoJSON and many formats
                            coordinates: [lng, lat]
                        },
                        properties: {
                            title: title,
                            description: description,
                            // one can customize markers by adding simplestyle properties
                            // http://mapbox.com/developers/simplestyle/
                            'marker-size': size,
                            'marker-color': type.color,
                            'marker-symbol': type.icon
                        }
                    }).addTo(map);
                }
            }
        });
    };

    /**
     * Add markers from url.
     * @param url - array of GeoJson markers
     */
    this.setMarkers = function (url) {
        featureLayer.loadURL(url);
    }
}
