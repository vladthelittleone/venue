'use strict';

/* Services */

// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('sprinkle.services', [])
    .factory('$authentication', function () {
        var isAuthenticate = localStorage.getItem('isAuthenticate');

        return {
            isSignIn: true,
            isAuthenticate: function () {
                return localStorage.getItem('isAuthenticate') || false;
            },
            authenticate: function () {
                localStorage.setItem('isAuthenticate', true);
            },
            logout: function () {
                localStorage.setItem('isAuthenticate', false);
            }
        };
    }
);