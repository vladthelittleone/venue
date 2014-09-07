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
                        var id = $authentication.getId();

                        if (id !=null) {
                            $location.path("/id" + id);
                        } else {
                            this.toMainPage();
                        }
                    },
                    toMainPage: function () {
                        $location.path("/");
                    },
                    toProfileWithId: function (id) {
                        if (id !=null) {
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
                        if (id !=null) {
                            $location.path("/event" + id);
                        } else {
                            this.toMainPage();
                        }
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