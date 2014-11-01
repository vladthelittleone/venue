/**
 * Created by vladthelittleone on 01.11.14.
 */
angular.module('venue.services')

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

        }

    ]);