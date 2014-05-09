'use strict';

// Declare app level module which depends on filters, and services
angular.module('sprinkle', [
    'ngRoute',
    'sprinkle.filters',
    'sprinkle.services',
    'sprinkle.directives',
    'sprinkle.authentication'
]).
    config(['$routeProvider',
        function ($routeProvider) {
            $routeProvider.when('/signin', {
                templateUrl: 'authentication',
                controller: 'signInCtrl'
            });

            $routeProvider.when('/signup', {
                templateUrl: 'authentication',
                controller: 'signUpCtrl'
            });

            $routeProvider.otherwise({redirectTo: '/'});

            // Use html5 mode.
            // $locationProvider.html5Mode(true)
        }
    ])
    .run(['$location', '$authentication',
        function ($location, $authentication) {
            if (!$authentication.isAuthenticate()){
                $location.path("/signin");
            }
        }
    ])
    .controller('bodyCtrl', ['$scope', '$authentication',
        // TODO logout
        function ($scope, $authentication) {
            $scope.auth = $authentication;

            $scope.logout = function () {
                $scope.auth.logout();
            }
        }
    ]);
