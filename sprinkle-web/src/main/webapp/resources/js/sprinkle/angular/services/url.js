/**
 * Created by vladthelittleone on 08.06.14.
 */

angular.module('sprinkle.services')
    /**
     * Service that responding for redirection and urls.
     */
    .factory('$url', ['$location', '$authentication',
        function ($location, $authentication) {
            return {
                /**
                 * Redirects
                 */
                redirect : {
                    toProfile: function () {
                        $location.path("/id" + $authentication.getId());
                    },
                    toMainPage: function () {
                        $location.path("/");
                    },
                    toProfileWithId: function (id) {
                        $location.path("/id" + id);
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
                        $location.path("/event" + id);
                    }
                },
                /**
                 * Resources
                 */
                resources : {
                    types: "map/types.json",
                    events: "map/events.geojson",
                    profileStatus: "/authentication/profilestatus.json"
                },
                /**
                 * Links
                 */
                setEvent: "map/setevent",
                logout: "/logout",
                signIn: "j_spring_security_check",
                signUp: "authentication/signup"
            };
    }]);