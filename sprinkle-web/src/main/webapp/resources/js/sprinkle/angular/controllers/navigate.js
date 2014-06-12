/**
 * Created by vladthelittleone on 08.06.14.
 */

angular.module('sprinkle.controllers')
    /**
     * Body controller that handle body content.
     * @controller
     */
    .controller('navigateCtrl', ['$scope', '$authentication', '$http', '$redirect', '$map',
        function ($scope, $authentication, $http, $redirect, $map) {
            $scope.authenticationService = $authentication;
            $scope.mapService = $map;
            $scope.redirect = $redirect;

            /**
             * Function for logout button,
             * clear localStorage and logout from server.
             */
            $scope.logout = function () {
                $http.get("/logout").
                    success(function () {
                        $scope.authenticationService.logout();
                        $redirect.toSignIn();
                    });
            };
        }
    ]);