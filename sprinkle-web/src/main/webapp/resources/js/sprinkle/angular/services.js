'use strict';

/* Services */

/**
 * Service that contains information about authentication and authentication logic.
 */
angular.module('sprinkle.services', [])
    .factory('$authentication',
    function () {
        return {
            isSignIn: true,
            getUsername: function () {
                return localStorage.getItem('username');
            },
            getId: function () {
                return localStorage.getItem('id');
            },
            isAuthenticate: function () {
                return localStorage.getItem('isAuthenticate') === 'true';
            },
            authenticate: function (user) {
                localStorage.setItem('isAuthenticate', 'true');
                localStorage.setItem('username', user.username);
                localStorage.setItem('id', user.id);
            },
            logout: function () {
                localStorage.clear();
            },
            isValidEmailAddress: function (scope) {
                var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
                var s = scope.sign.email;

                if (!pattern.test(s)) {
                    return false;
                }

                return s != '';
            }
        };
    })
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
            }
        };
    }]);