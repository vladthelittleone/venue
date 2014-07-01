/**
 * Created by vladthelittleone on 08.06.14.
 */

angular.module('sprinkle.controllers')
    /**
     * Body controller that handle body content.
     * @controller
     */
    .controller('navigateCtrl', ['$scope', '$authentication', '$http', '$url', '$map',
        function ($scope, $authentication, $http, $url, $map) {
            $scope.authenticationService = $authentication;
            $scope.mapService = $map;
            $scope.redirect = $url.redirect;

            /**
             * Function for logout button,
             * clear localStorage and logout from server.
             */
            $scope.logout = function () {
                $http.get($url.logout).
                    success(function () {
                        $scope.authenticationService.logout();
                        $url.redirect.toSignIn();
                    });
            };
        }
    ]);