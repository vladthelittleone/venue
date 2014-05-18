'use strict';

// Declare app level module which depends on filters, and services
angular.module('sprinkle', [
    'ngRoute',
    'sprinkle.filters',
    'sprinkle.services',
    'sprinkle.directives',
    'sprinkle.authentication'
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

            $routeProvider.otherwise({redirectTo: '/'});

            $locationProvider.html5Mode(true);
            $locationProvider.hashPrefix('!');
        }
    ])
    .run(['$location', '$authentication',
        function ($location, $authentication) {
            if (!$authentication.isAuthenticate()){
                $location.path("/signin");
            }
        }
    ])
    .controller('bodyCtrl', ['$scope', '$authentication', '$http',
        function ($scope, $authentication, $http) {
            $scope.auth = $authentication;

            $scope.logout = function () {
                $http.get("/logout").
                    success(function () {
                        $scope.auth.logout();
                    });
            }
        }
    ]);
