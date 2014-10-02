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
    .controller('signInCtrl', ['$scope', '$url', '$authentication', '$http', '$animation',
        function ($scope, $url, $authentication, $http, $animation) {

            /**
             * Initializing.
             * @see html/authentication/index.html
             * @see controllers/utils.js
             */
            initialize($scope, $authentication, $url.redirect);

            var alert = $scope.authenticationAlert;
            var details = $scope.authenticationDetails;

            $scope.authenticate = function () {
                var payload =
                    'j_username=' + details.email +
                    '&j_password=' + details.password +
                    '&_spring_security_remember_me=' + details.rememberMe;

                var config = {
                    headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
                };

                /**
                 * TODO перенести в сервис url (переименновать), возвращать callback.
                 */
                $http.post($url.signIn, payload, config).
                    success(function (profileStatus) {
                        /**
                         * If user sing in, then redirect to profile page.
                         * Else display warning.
                         */
                        if (profileStatus.signedIn) {
                            $url.redirect.toProfileWithId(profileStatus.id);
                        } else {
                            alert.alertMessage(profileStatus.message);
                            $animation.authenticationShake();
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
    .controller('signUpCtrl', ['$scope', '$authentication', '$http', '$url', '$animation',
        function ($scope, $authentication, $http, $url, $animation) {

            // -------------------------------
            // Private functions.

            /**
             * Validating.
             */
            function valid() {
                var details = $scope.authenticationDetails;
                var alert = $scope.authenticationAlert;

                if (details.password != details.passwordCheck) {
                    alert.alertWarning("Passwords don't match.", false, true, false);
                    $animation.authenticationShake();
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
            initialize($scope, $authentication, $url.redirect);
            var alert = $scope.authenticationAlert;
            var details = $scope.authenticationDetails;

            $scope.authenticate = function () {

                if (!valid()) return;

                $http.post($url.signUp,
                    {
                        username: details.email,
                        fullname: details.fullName,
                        password: details.password
                    }).success(function (authStatus) {
                        /**
                         * If sign up success, then redirect to sign in page.
                         * Else display warning.
                         */
                        if (authStatus.success) {
                            $url.redirect.toSignIn();
                        } else {
                            alert.alertWarning(authStatus.message, true, false, false);
                            $animation.authenticationShake();
                        }
                    });
            };
        }
    ])
/**
 * Controller that handle new event operation.
 * @controller
 */
    .controller('createEventCtrl', ['$scope', '$map', '$authentication', '$url', '$http',
        function ($scope, $map, $authentication, $url, $http) {
            $scope.mapService = $map;
            $scope.authenticationService = $authentication;

            var sprinkleMap = $map.getSprinkleMap();

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
            $http.get($url.resources.types).success(function (types) {
                $scope.eventTypes = types;
            });

            /**
             * Function redirect user to profile and switch creation off.
             * @see map service
             */
            $scope.closeEventCreation = function () {
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
                var service = $scope.mapService;

                // Check event creation on
                if (service.isEventCreationOn()) {
                    $scope.$apply(function () {
                        // Validate fields
                        if ($scope.newEvent.name == ""
                            || $scope.newEvent.description == ""
                            || $scope.newEvent.type == null) {
                            // TODO shake or something another
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
    .controller('eventViewCtrl', ['$scope', '$url', '$http', '$routeParams',
        function ($scope, $url, $http, $routeParams) {
            // Properties of event

            $http.get($url.resources.event, {
                    params: {
                        id: $routeParams.eventId
                    }
                }).success(function (data) {
                    console.log(data);
                    $scope.properties = data.properties;
                });

            console.log($scope.properties);
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
    .controller('navigateCtrl', ['$scope', '$authentication', '$http', '$url', '$map',
        function ($scope, $authentication, $http, $url, $map) {
            $scope.authenticationService = $authentication;
            $scope.mapService = $map;
            $scope.redirect = $url.redirect;

            /**
             * Function for logout button,
             * clear localStorage and logout from server.
             */
            $scope.logout = function () {
                $http.get($url.logout).
                    success(function () {
                        $scope.authenticationService.logout();
                        $url.redirect.toSignIn();
                    });
            };
        }
    ]);

/**
 * Initializer of authentication controllers.
 * @param $scope - controller scope.
 * @param $authentication - authenticate service.
 * @param redirect - redirect service.
 */
function initialize($scope, $authentication, redirect) {
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
    $scope.authenticationDetails = new Authentication();
    // Alert information
    $scope.authenticationAlert = new AuthenticationAlert($scope.authenticationDetails);
}