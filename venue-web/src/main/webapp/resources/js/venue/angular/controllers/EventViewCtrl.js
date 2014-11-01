'use strict';

/**
 * Created by vladthelittleone on 01.11.14.
 * Initialization of venue.controllers.
 */
angular.module('venue.controllers', [])

    /**
     * Controller responding for events view page.
     * @controller
     */
    .controller('eventViewCtrl', ['$scope', '$connection',

        function ($scope, $connection) {

            // Properties of event
            $connection.httpGetEventProperties()

                .success(function (data) {

                             $scope.properties = data.properties;

                         });

            $scope.resizeFull = false;

            // Closing event window
            $scope.closeEventView = function () {

                $connection.redirect.toProfile();

            };

            // Resize window
            $scope.resize = function () {

                $scope.resizeFull = !$scope.resizeFull;

            };

        }

    ]);