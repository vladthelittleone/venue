/**
 * Created by vladthelittleone on 22.09.14.
 */
/**
 * Created by vladthelittleone on 08.06.14.
 */
/**
 * Class thar responding for authentication alert.
 * @param sign - {@link Authentication}
 * @constructor
 */
function AuthenticationAlert(sign) {
    this.show = false;
    this.message = "";

    /**
     * Fields responding for incorrect inputs.
     * @type {boolean}
     */
    this.invalidPassword = false;
    this.invalidFullName = false;
    this.invalidEmail = false;

    /**
     * Alert warning.
     * @param message - warning message.
     * @param invalidEmail - true - email invalid / false - email valid
     * @param invalidPassword - true - password invalid / false - password valid
     * @param invalidFullName - true - full name invalid / false - full name valid
     */
    this.alertWarning = function (message, invalidEmail, invalidPassword, invalidFullName) {
        this.change(message, true);

        this.invalidPassword = invalidPassword;
        this.invalidEmail = invalidEmail;
        this.invalidFullName = invalidFullName;
    };

    this.alertMessage = function (msg) {
        this.change(msg, true);
        this.invalidEmail = true;
        this.invalidPassword = true;
    };


    /**
     * Change alert state.
     * @param message - message that will be shown.
     * @param show - true - show alert / false - don't.
     */
    this.change = function (message, show) {
        this.show = show;
        this.message = message;
        this.invalidPassword = false;
        this.invalidFullName = false;
        this.invalidEmail = false;
        sign.reset();
    };
}

function Authentication() {
    this.rememberMe = false;

    /**
     * Fields contains input information.
     * @type {string}
     */
    this.email = '';
    this.password = '';
    this.passwordCheck = '';
    this.fullName = '';

    /**
     * Remember-me toggle.
     */
    this.switchRememberMe = function () {
        this.rememberMe = !this.rememberMe;
    };

    /**
     * Set fields of authentication form empty.
     */
    this.reset = function () {
        this.email = '';
        this.password = '';
        this.passwordCheck = '';
        this.fullName = '';
    };
}

// ---------------- Button-checkbox style
function checkboxStyle() {
    jQuery('.buttonCheckbox').each(function () {

        // Settings
        var $widget = jQuery(this),
            $button = $widget.find('button'),
            $checkbox = $widget.find('input:checkbox'),
            color = $button.data('color'),
            settings = {
                on: {
                    icon: 'glyphicon glyphicon-check'
                },
                off: {
                    icon: 'glyphicon glyphicon-unchecked'
                }
            };

        // Event Handlers
        $button.on('click', function () {
            $checkbox.prop('checked', !$checkbox.is(':checked'));
            $checkbox.triggerHandler('change');
            updateDisplay();
        });
        $checkbox.on('change', function () {
            updateDisplay();
        });

        // Actions
        function updateDisplay() {
            var isChecked = $checkbox.is(':checked');

            // Set the button's state
            $button.data('state', (isChecked) ? "on" : "off");

            // Set the button's icon
            $button.find('.state-icon')
                .removeClass()
                .addClass('state-icon ' + settings[$button.data('state')].icon);

            // Update the button's color
            if (isChecked) {
                $button
                    .removeClass('rememberMeButton')
                    .addClass('rememberMeButtonChecked');
            }
            else {
                $button
                    .removeClass('rememberMeButtonChecked')
                    .addClass('rememberMeButton');
            }
        }

        // Initialization
        function init() {

            updateDisplay();

            // Inject the icon if applicable
            if ($button.find('.state-icon').length == 0) {
                $button.prepend('<i class="state-icon ' + settings[$button.data('state')].icon + '"></i>');
            }
        }

        init();
    });
}

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
        zoomControl: false,
        maxBounds: bounds,
        maxZoom: 19,
        minZoom: 2
    })
        .setView([40, -74.50], 9);

    // Create feature for markers
    var featureLayer = L.mapbox.featureLayer().addTo(map);

    // Centring
    featureLayer.on('click', function (e) {
        map.panTo(e.layer.getLatLng());
        var marker = e.layer;
        var feature = marker.feature;

        // Get angular js element
        var elem = angular.element(document.getElementById("map"));

        /**
         * Get angular js service using injector
         * to interact with framework.
         * @see url.js file.
         */
        var service = elem.injector().get('$url');

        // Redirect to event
        service.redirect.toEventWithId(feature.properties.eventId);

        // Root scope for global fields.
        // All fields of root scope available for all child scopes.
        var rootScope = angular.element(document).
            injector().invoke(
            function ($rootScope) {
                return $rootScope;
            });

        // TODO loading form server
        // Add to root scope, information about selected event.
        rootScope.selectedEvent = feature;

        // Apply changes
        elem.scope().$apply();
    });

    /**
     * Show a markers tooltip on mouse over instead of on click.
     */
    featureLayer.on('mouseover', function (e) {
        e.layer.openPopup();
    });

    /**
     * Hide a markers tooltip on mouse out.
     */
    featureLayer.on('mouseout', function (e) {
        e.layer.closePopup();
    });

    // Add custom popups to each using our custom feature properties
    featureLayer.on('layeradd', function (e) {
        var marker = e.layer,
            feature = marker.feature;

        console.log(feature.properties.title);
        // Create custom popup content
        var popupContent =
            '<div class="markerPopup">' +
            '<img src="http://kudago.com/media/thumbs/a4/d5/a4d5c9746165933f2f879b1d815a6629.jpg"/>' +
            '<div class="markerTitle">'
            + feature.properties.title + '</div>' +
            '</div>';

        // http://leafletjs.com/reference.html#popup
        marker.bindPopup(popupContent, {
            closeButton: false,
            minWidth: 300
        });
    });

    this.getMap = function () {
        return map;
    };

    /**
     * Set marker on map. If successful return true, else false.
     *
     * @param url - url to get event json object
     * @param lng - longitude
     * @param lat - latitude
     * @param title - title
     * @param description - description of marker
     * @param size - size of marker
     * @param type - type of marker (Sport, Science, etc.)
     * @returns {boolean}
     */
    this.setMarker = function (url, lng, lat, title, description, size, type) {
        // Set result of ajax request to false.
        var result = false;

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
                if (responce.success) {
                    // Set result of ajax request to true.
                    result = true;

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

        return result;
    };

    /**
     * Add markers from url.
     * @param url - array of GeoJson markers
     */
    this.setMarkers = function (url) {
        featureLayer.loadURL(url);
    }
}
