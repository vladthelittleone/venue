'use strict';

// Declare app level module which depends on filters, and services
angular.module('sprinkle', [
        'ngRoute',
        'sprinkle.filters',
        'sprinkle.services',
        'sprinkle.directives',
        'sprinkle.controllers',
        'ui.bootstrap'
    ]).
    /**
     * Route provider configuration.
     */
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

            /**
             * Rest like link, that contains id of user.
             */
            $routeProvider.when('/id:profileId', {
                templateUrl: 'profile',
                controller: 'profileCtrl'
            });

            $routeProvider.otherwise({redirectTo: '/'});

            $locationProvider.html5Mode(true);
            $locationProvider.hashPrefix('!');
        }
    ])

    /**
     * Block that run when application start.
     */
    .run(['$authentication', '$rootScope', '$http', '$redirect',
        function ($authentication, $rootScope, $http, $redirect) {
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
             * If user isn't authenticate, redirect to sign in page, else to profile.
             */
            if (!$authentication.isAuthenticate()) {
                $redirect.toSignIn();
            } else {
                $redirect.toProfile();
            }
        }
    ]);
