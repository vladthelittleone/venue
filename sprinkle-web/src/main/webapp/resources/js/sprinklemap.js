/**
 * Created by vladthelittleone on 29.04.14.
 */

$(document).ready(function () {
    // --------------- LOAD MAP
    var map = L.mapbox.map('map', 'examples.map-9ijuk24y')
        .setView([40, -74.50], 9);

    // Set setting panel to bottom left position
    map.zoomControl.setPosition('bottomleft');

    map.on('click', function(e) {
        setMarker(e.latlng.lng, e.latlng.lat, "Bicycle", "Friends, let's go cycling!", "large", "#ff4444", "bicycle");
    });

    // Latitude and Longitude
    function setMarker(lng, lat, title, description, size, color, type){
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
});

