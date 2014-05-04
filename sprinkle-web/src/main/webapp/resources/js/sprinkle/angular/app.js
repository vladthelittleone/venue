'use strict';

var sprinkle = {};

var app = angular.module('sprinkle', [
    'sprinkle.filters',
    'sprinkle.services',
    'sprinkle.directives'
]);

// Declare app level module which depends on filters, and services
app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'main/index',
        controller: SprinkleCtrl
    });

    $routeProvider.when('/sign', {
        templateUrl: 'sign/index',
        controller: SignCtrl
    });

    $routeProvider.otherwise({redirectTo: '/'});
}]);
