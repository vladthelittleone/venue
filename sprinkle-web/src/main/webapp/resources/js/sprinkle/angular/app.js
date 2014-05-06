'use strict';


// Declare app level module which depends on filters, and services
angular.module('sprinkle', [
    'ngRoute',
    'sprinkle.filters',
    'sprinkle.services',
    'sprinkle.directives',
    'sprinkle.controllers'
]).
    config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $routeProvider.when('/authentication', {
            templateUrl: 'authentication',
            controller: 'authenticationCtrl'
        });

        $routeProvider.otherwise({redirectTo: '/'});

        // Use html5 mode.
//        $locationProvider.html5Mode(true)
    }]);
