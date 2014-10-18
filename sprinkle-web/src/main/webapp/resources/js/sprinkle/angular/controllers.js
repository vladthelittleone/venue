'use strict';

/**
 * Created by vladthelittleone on 08.06.14.
 * Initialization of sprinkle.controllers.
 */
angular.module('sprinkle.controllers', [])
/**
 * Controller that handling sign in information and events.
 * Send user sign in info on server {@link authenticate} and get response.
 * @controller
 */
    .controller('signInCtrl', ['$scope', '$url', '$authentication', '$animation',
        function ($scope, $url, $authentication, $animation) {
            /**
             * Initializing.
             * @see html/authentication/index.html
             * @see controllers/utils.js
             */
            initialize($scope, $authentication, $animation, $url.redirect);

            var details = $scope.authenticationDetails;

            $scope.authenticate = function () {
                $url.http.signIn(details);
            };

            checkboxStyle();
        }
    ])
/**
 * Controller that handling sign up information and events.
 * Send user sign up info on server {@link signUp} and get response.
 * Change authentication service parameters, such like isAuthenticate variable.
 * @controller
 */
    .controller('signUpCtrl', ['$scope', '$authentication', '$url', '$animation',
        function ($scope, $authentication, $url, $animation) {

            // -------------------------------
            // Private functions.

            /**
             * Validating.
             */
            function valid() {
                if (details.password != details.passwordCheck) {
                    details.alertWarning("Passwords don't match.", false, true, false);
                    return false;
                }
                return true;
            }

            // -------------------------------

            /**
             * Initializing. isSignInVisible field equals true, this means that sign up components will be shown.
             * @see html/authentication/index.html
             * @see controllers/utils.js
             */
            initialize($scope, $authentication, $animation, $url.redirect);
            var details = $scope.authenticationDetails;

            $scope.authenticate = function () {
                if (!valid()) return;
                $url.http.signUp(details);
            };
        }
    ])
/**
 * Controller that handle new event operation.
 * @controller
 */
    .controller('createEventCtrl', ['$scope', '$map', '$authentication', '$url',
        function ($scope, $map, $authentication, $url) {
            var sprinkleMap = $map.getSprinkleMap();

            // TODO пренести в сервис main
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
            $scope.eventTypes = $url.getTypes();

            /**
             * Function redirect user to profile and switch creation off.
             * @see map service
             */
            $scope.closeEventCreation = function () {
                // TODO ЗАЩИМ В СЕРВИСЕ?
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
                var service = $map;

                // Check event creation on
                // TODO ЗАЩИМ В СЕРВИСЕ?
                if (service.isEventCreationOn()) {
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
    ])
/**
 * Controller responding for events view page.
 * @controller
 */
    .controller('eventViewCtrl', ['$scope', '$url',
        function ($scope, $url) {
            // Properties of event
            $scope.properties = $url.getEventProperties();
            $scope.resizeFull = false;

            // Closing event window
            $scope.closeEventView = function () {
                $url.redirect.toProfile();
            };

            // Resize window
            $scope.resize = function () {
                $scope.resizeFull = !$scope.resizeFull;
            };
        }
    ])
/**
 * Controller that handle body content.
 * @controller
 */
    .controller('mainCtrl', ['$scope', '$authentication', '$url', '$map',
        function ($scope, $authentication, $url, $map) {
            $scope.authenticationService = $authentication;
            $scope.mapService = $map;
            $scope.redirect = $url.redirect;

            /**
             * Function for logout button,
             * clear localStorage and logout from server.
             */
            $scope.logout = $url.logout($authentication);
        }
    ]);

/**
 * Initializer of authentication controllers.
 * @param $scope - controller scope.
 * @param $authentication - authenticate service.
 * @param $animation - animation service.
 * @param redirect - redirect service.
 */
function initialize($scope, $authentication, $animation, redirect) {
    /**
     * Check authentication of user.
     */
    if ($authentication.isAuthenticate()) {
        redirect.toProfile();
        return;
    }

    // Redirect mechanism
    $scope.redirect = redirect;

    // Authentication information
    $scope.authenticationDetails = new Authentication($animation);
}