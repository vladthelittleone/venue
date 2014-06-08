/**
 * Created by vladthelittleone on 08.06.14.
 */

angular.module('sprinkle.controllers')
    /**
     * Main controller that handle body content.
     * @controller
     */
    .controller('mainCtrl', ['$scope', '$authentication', '$http', '$redirect', '$profile',
        function ($scope, $authentication, $http, $redirect, $profile) {
            $scope.authenticationService = $authentication;
            $scope.profileService = $profile;

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
            }
        }
    ]);