'use strict';

// Declare app level module which depends on filters, and services
angular.module('venue', [
        'ngRoute',
        'ngAnimate',
        'venue.filters',
        'venue.services',
        'venue.directives',
        'venue.controllers'
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

            $routeProvider.otherwise({redirectTo: '/'});

            $locationProvider.html5Mode(true);
            $locationProvider.hashPrefix('!');
        }
    ])

    /**
     * Block that run when application start.
     */
    .run(['$authentication', '$rootScope', '$connection', '$map',
        function ($authentication, $rootScope, $connection, $map) {
            /**
             * Performed at route change.
             * Check authentication. If authenticate, then send username to authentication service.
             * Else logout and clear local storage. Also load events form server and add them on the map.
             */
            $rootScope.$on('$routeChangeSuccess', function () {
                $connection.httpProfileStatus().
                    success(function (data) {
                        if (data.signedIn) {
                            $authentication.authenticate(data);
                        } else {
                            $authentication.logout();
                        }
                    });
            });

            /**
             * Get events from server and add them on the map.
             */
            $connection.httpGetEvents().
                success(function (data) {
                    $map.getVenueMap().setMarkers(data);
                });
        }
    ]);
