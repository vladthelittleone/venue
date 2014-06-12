/**
 * Created by vladthelittleone on 29.04.14.
 * Class responding for map configurations.
 * @constructor
 */
function SprinkleMap() {
    // Initialize mapbox
    var map = L.mapbox.map('map', 'examples.map-i86nkdio')
        .setView([40, -74.50], 9);

    this.getMap = function () {
        return map;
    };

    // Latitude and Longitude
    this.setMarker = function (lng, lat, title, description, size, color, type){
        $.ajax({
            type: "POST",
            async: false,
            url: "map/setmarket",
            data: {
                lng: lng,
                lat: lat,
                title: title,
                description: description,
                size: size,
                color: color,
                type: type
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
                            'marker-color': color,
                            'marker-symbol': type
                        }
                    }).addTo(map);
                }
            }
        });
    }
}
