'use strict';

/* Directives */

angular.module('sprinkle.directives', [])
/**
 * Directive responding for adding css class .active.
 */
    .directive('activeLink', ['$location', function ($location) {
        return {
            restrict: 'A', //use as attribute
            replace: false,
            link: function (scope, elem) {
                //after the route has changed
                scope.$on("$routeChangeSuccess", function () {
                    var selectors = ['ul > li > [href="#' + $location.path() + '"]',
                            'ul > li > [href="/#' + $location.path() + '"]', //html5: false
                            'ul > li > [href="' + $location.path() + '"]']; //html5: true

                    $(elem).find("*").removeClass('active');

                    $(elem).find(selectors.join(',')) //find the matching link
                        .parent('li').addClass('active') //add active class to the matching element
                        .siblings('li').removeClass('active'); //remove it from the sibling elements
                });
            }
        }
    }]);