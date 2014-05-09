'use strict';

/* Services */

/**
 * Service that contains information about authentication and authentication logic.
 */
angular.module('sprinkle.services', [])
    .factory('$authentication',
    function () {
        var isAuthenticate = localStorage.getItem('isAuthenticate');

        return {
            isSignIn: true,
            isAuthenticate: function () {
                return localStorage.getItem('isAuthenticate') === 'true';
            },
            authenticate: function () {
                localStorage.setItem('isAuthenticate', 'true');
            },
            logout: function () {
                localStorage.setItem('isAuthenticate', 'false');
            }
        };
    }
);