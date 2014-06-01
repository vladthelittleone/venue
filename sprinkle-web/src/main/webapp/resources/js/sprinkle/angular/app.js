'use strict';

// Declare app level module which depends on filters, and services
angular.module('sprinkle', [
    'ngRoute',
    'sprinkle.filters',
    'sprinkle.services',
    'sprinkle.directives',
    'sprinkle.authentication',
    'ui.bootstrap'
]).
    config(['$routeProvider', '$locationProvider',
        function ($routeProvider, $locationProvider) {
            $routeProvider.when('/signin', {
                templateUrl: 'authentication',
                controller: 'signInCtrl'
            });

            $routeProvider.when('/signup', {
                templateUrl: 'authentication',
                controller: 'signUpCtrl'
            });

            $routeProvider.when('/id=:profileId', {
                templateUrl: 'profile'
            });

            $routeProvider.otherwise({redirectTo: '/'});

            $locationProvider.html5Mode(true);
            $locationProvider.hashPrefix('!');
        }
    ])
    .run(['$location', '$authentication', '$rootScope', '$http',
        function ($location, $authentication, $rootScope, $http) {
            /**
             * Check authentication. If authenticate, then send username to authentication service.
             * Else logout and clear local storage.
             */
            $rootScope.$on('$routeChangeSuccess', function () {
                $http.get("/authentication/isauthenticate").
                    success(function (data) {
                        if (data.signedIn) {
                            $authentication.authenticate(data);
                        } else {
                            $authentication.logout();
                        }
                    });
            });

            /**
             * Redirect on run.
             */
            if (!$authentication.isAuthenticate()) {
                $location.path("/signin");
            }
        }
    ]);
