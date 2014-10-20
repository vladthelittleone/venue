'use strict';

/**
 * Created by vladthelittleone on 22.09.14.
 */
angular.module('sprinkle.services', [])

/**
 * Service that contains animation functions.
 */
    .factory('$animation', [ '$animate',

        function ($animate) {

            return {

                /**
                 * Add css class to element, and remove by delay.
                 */
                animation: function (elementName, animationName) {

                    $animate.addClass(jQuery(elementName), animationName, function () {

                        $animate.removeClass(jQuery(elementName), animationName);

                    });

                },

                /**
                 * Shake elements with class .content.
                 * @see controllers/authentication
                 */
                authenticationShake: function () {

                    this.animation(".content", 'shake');

                }

            };

        }])

/**
 * Service that contains information about authentication and authentication logic.
 */
    .factory('$authentication', [ '$storage',

        function ($storage) {

            return {

                /**
                 * @returns {string}
                 */
                getUsername: function () {

                    return $storage.local.getItem('username');

                },

                /**
                 * @returns {string}
                 */
                getId: function () {

                    return $storage.local.getItem('id');

                },

                /**
                 * @returns {boolean}
                 */
                isAuthenticate: function () {

                    return $storage.local.getItem('isAuthenticate') === 'true';

                },

                authenticate: function (user) {

                    $storage.local.setItem('isAuthenticate', 'true');

                    $storage.local.setItem('username', user.username);

                    $storage.local.setItem('id', user.id);

                },

                logout: function () {

                    $storage.local.clear();

                }
            };
        }])
/**
 * Service that responding for web storage.
 */
    .factory('$storage', function () {

        /**
         * Private function that return storage. If web storage not supported, then
         * return custom storage with array. Also resolve issue with private mode.
         */
        function initializeStorage(type) {

            // Check storage support.
            try {

                type.setItem("storage", "");

                type.removeItem("storage");

                return type;

            }
            catch (e) {

                // Custom storage.
                return {

                    s: {},

                    setItem: function (key, value) {

                        this.s[key] = value;

                    },

                    getItem: function (key) {

                        if (typeof this.s[key] != 'undefined') {

                            return this.s[key];

                        }
                        else {

                            return null;

                        }

                    },

                    removeItem: function (key) {

                        this.s[key] = undefined;

                    },

                    clear: function () {

                        this.s.length = 0;

                    }

                };

            }

        }

        return {

            /**
             * Local storage.
             */
            local: initializeStorage(localStorage),

            /**
             * Session storage.
             */
            session: initializeStorage(sessionStorage)

        }

    })
/**
 * Service that responding for redirection, https. Facade over $http service methods.
 * All http* methods returns promise.
 */
    .factory('$connection', ['$location', '$authentication', '$http', '$routeParams',

        function ($location, $authentication, $http, $routeParams) {

            /**
             * Resources
             */
            var resources = {

                event: "map/event.geojson",
                types: "map/types.json",
                events: "map/events.geojson",
                profileStatus: "/authentication/profilestatus.json"

            };

            /**
             * Links
             */
            var links = {

                createEvent: "map/createvent",
                logout: "/logout",
                signIn: "j_spring_security_check",
                signUp: "authentication/signup"

            };

            return {
                /**
                 * Request for sign in.
                 * @param details - authentication user info.
                 */
                httpSignIn: function (details) {

                    // For remember me requests.
                    var payload =
                        'j_username=' + details.email +
                        '&j_password=' + details.password +
                        '&_spring_security_remember_me=' + details.rememberMe;

                    var config = {

                        headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}

                    };

                    return $http.post(links.signIn, payload, config);

                },

                /**
                 * Sign up request.
                 */
                httpSignUp: function (details) {

                    return $http.post(links.signUp,
                        {

                            username: details.email,
                            fullname: details.fullName,
                            password: details.password

                        });

                },

                httpGetTypes: function () {

                    return $http.get(resources.types);

                },

                httpGetEventProperties: function () {

                    return $http.get(resources.event, {

                        params: {
                            id: $routeParams.eventId
                        }

                    });

                },

                httpLogout: function () {

                    return $http.get(links.logout);

                },

                httpProfileStatus: function () {

                    return $http.get(resources.profileStatus);

                },

                httpGetEvents: function () {

                    return $http.get(resources.events);

                },

                /**
                 * Create event on the server side.
                 *
                 * @param fn - function that will be run after success.
                 * @param lng - longitude of event.
                 * @param lat - latitude of event.
                 * @param title - title of event.
                 * @param description - description of event.
                 * @param size - size of event.
                 * @param type - type of event.
                 */
                httpCreateEvent: function (lng, lat, title, description, size, type, fn) {

                    /**
                     * Use jquery for that type of request.
                     */
                    $.ajax({
                               type: "POST",
                               async: false,
                               url: links.createEvent,
                               data: {
                                   lng: lng,
                                   lat: lat,
                                   title: title,
                                   description: description,
                                   size: size,
                                   type: type.name
                               },
                               dataType: 'json',
                               success: fn
                           });

                },

                /**
                 * Redirects
                 */
                redirect: {

                    toProfile: function () {

                        var id = $authentication.getId();

                        if (id != null) {

                            $location.path("/id" + id);

                        } else {

                            this.toMainPage();

                        }

                    },

                    toMainPage: function () {

                        $location.path("/");

                    },

                    toProfileWithId: function (id) {

                        if (id != null) {

                            $location.path("/id" + id);

                        } else {

                            this.toMainPage();

                        }

                    },

                    toSignIn: function () {

                        $location.path("/signin");

                    },

                    toSignUp: function () {

                        $location.path("/signup");

                    },

                    toNewEvent: function () {

                        $location.path("/new_event");

                    },

                    toEventWithId: function (id) {

                        if (id != null) {

                            $location.path("/event" + id);

                        } else {

                            this.toMainPage();

                        }

                    }

                }

            };

        }])
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

        return {

            getSprinkleMap: function () {

                return sprinkleMap;

            }

        };

    });