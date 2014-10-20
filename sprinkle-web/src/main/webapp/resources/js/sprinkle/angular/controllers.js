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
    .controller('signInCtrl', ['$scope', '$connection', '$authentication', '$animation',

        function ($scope, $connection, $authentication, $animation) {

            /**
             * Initializing.
             * @see html/authentication/index.html
             * @see controllers/utils.js
             */
            initialize($scope, $authentication, $animation, $connection.redirect);

            var details = $scope.authenticationDetails;

            var alert = $scope.authenticationAlert;

            $scope.authenticate = function () {

                $connection.httpSignIn(details)

                    .success(function (profileStatus) {

                            /**
                             * If user sing in, then redirect to profile page.
                             * Else display warning.
                             */
                            if (profileStatus.signedIn) {

                                $connection.redirect.toProfileWithId(profileStatus.id);

                            } else {

                                alert.alertMessage(profileStatus.message);

                            }

                    });

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
    .controller('signUpCtrl', ['$scope', '$authentication', '$connection', '$animation',

        function ($scope, $authentication, $connection, $animation) {

            // -------------------------------
            // Private functions.

            /**
             * Validating.
             */
            function valid() {

                if (details.password != details.passwordCheck) {

                    alert.alertWarning("Passwords don't match.", false, true, false);

                    return false;

                }

                return true;

            }

            // -------------------------------

            /**
             * Initializing.
             * @see html/authentication/index.html
             * @see controllers/utils.js
             */
            initialize($scope, $authentication, $animation, $connection.redirect);

            var details = $scope.authenticationDetails;

            var alert = $scope.authenticationAlert;

            $scope.authenticate = function () {

                if (!valid()) return;

                $connection.httpSignUp(details)

                    .success(function (authStatus) {

                            /**
                             * If sign up success, then redirect to sign in page.
                             * Else display warning.
                             */

                            if (authStatus.success) {

                                $connection.redirect.toSignIn();

                            } else {

                                alert.alertWarning(authStatus.message, true, false, false);

                            }

                    });

            };

        }

    ])
/**
 * Controller that handle new event operation.
 * @controller
 */
    .controller('createEventCtrl', ['$scope', '$map', '$authentication', '$connection',

        function ($scope, $map, $authentication, $connection) {

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
            $connection.httpGetTypes()

                .success(function (types) {

                    $scope.eventTypes = types;

                });

            /**
             * Function redirect user to profile and switch creation off.
             * @see map service
             */
            $scope.closeEventCreation = function () {

                // TODO ЗАЩИМ В СЕРВИСЕ?
                $map.setEventCreationOn(false);

                $connection.redirect.toProfile();

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
                        if (sprinkleMap.setMarker($connection, e.latlng.lng, e.latlng.lat,

                            m.name, m.description, "large", m.type)) {

                            // If request from service is true, then
                            // set event creation off
                            service.isEventCreationOn(false);

                            // And redirect to profile
                            $connection.redirect.toProfile();

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
    .controller('eventViewCtrl', ['$scope', '$connection',

        function ($scope, $connection) {

            // Properties of event
            $connection.httpGetEventProperties()

                .success(function (data) {

                    $scope.properties = data.properties;

                });

            $scope.resizeFull = false;

            // Closing event window
            $scope.closeEventView = function () {

                $connection.redirect.toProfile();

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
    .controller('mainCtrl', ['$scope', '$authentication', '$connection', '$map',

        function ($scope, $authentication, $connection, $map) {

            $scope.authenticationService = $authentication;

            $scope.mapService = $map;

            $scope.redirect = $connection.redirect;

            /**
             * Function for logout button,
             * clear localStorage and logout from server.
             */
            $scope.logout = function () {

                $connection.httpLogout().

                    success(function () {

                        $authentication.logout();

                        $connection.redirect.toSignIn();

                    });

            };

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

    // Authentication details
    $scope.authenticationDetails = new AuthenticationDetails();

    $scope.authenticationAlert = new AuthenticationAlert($scope.authenticationDetails, $animation);

}