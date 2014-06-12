/**
 * Created by vladthelittleone on 08.06.14.
 */

angular.module('sprinkle.services')
    /**
     * Service that responding for redirection.
     */
    .factory('$redirect', ['$location', '$authentication',
        function ($location, $authentication) {
            return {
                toProfile: function () {
                    $location.path("/id" + $authentication.getId());
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
                }
            };
    }]);