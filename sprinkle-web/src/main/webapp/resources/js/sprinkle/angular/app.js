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
                templateUrl: 'signInLayout',
                controller: 'signInCtrl'
            });

            $routeProvider.when('/signup', {
                templateUrl: 'signUpLayout',
                controller: 'signUpCtrl'
            });

            /**
             * Rest like link, that contains id of user.
             */
            $routeProvider.when('/id:profileId', {
                templateUrl: 'profileLayout'
            });

            $routeProvider.when('/event:eventId', {
                templateUrl: 'eventLayout',
                controller: 'eventViewCtrl'
            });

            $routeProvider.when('/createvent', {
                templateUrl: 'createEventLayout',
                controller: 'createEventCtrl'
            });

            $routeProvider.otherwise({redirectTo: '/'});

            $locationProvider.html5Mode(true);
            $locationProvider.hashPrefix('!');
        }
    ])

    /**
     * Block that run when application start.
     */
    .run(['$authentication', '$rootScope', '$http', '$url', '$map',
        function ($authentication, $rootScope, $http, $url, $map) {
            /**
             * Check authentication. If authenticate, then send username to authentication service.
             * Else logout and clear local storage. Also load events form server and add them on the map.
             */
            $rootScope.$on('$routeChangeSuccess', function () {
                $http.get($url.resources.profileStatus).
                    success(function (data) {
                        if (data.signedIn) {
                            $authentication.authenticate(data);
                        } else {
                            $authentication.logout();
                        }
                    });

                /**
                 * Get events from server and add them on the map.
                 */
                $map.getSprinkleMap().setMarkers($url.resources.events);
            });
        }
    ]);
