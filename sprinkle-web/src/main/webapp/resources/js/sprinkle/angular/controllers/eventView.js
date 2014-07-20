/**
 * Created by vladthelittleone on 30.06.14.
 */
angular.module('sprinkle.controllers')
/**
 * Controller responding for events view page.
 * @controller
 */
    .controller('eventViewCtrl', ['$scope', '$url',
        function ($scope, $url) {
            // Properties of event
            $scope.properties = $scope.selectedEvent.properties;
            $scope.resizeFull = false;

            // Closing event window
            $scope.closeEventView = function () {
                $url.redirect.toProfile();
            };

            // Resize window
            $scope.resize = function () {
                $scope.resizeFull = !$scope.resizeFull;
            };
        }
    ]);