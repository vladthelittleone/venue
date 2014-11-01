'use strict';

/**
 * Created by vladthelittleone on 01.11.14.
 */
angular.module('venue.controllers')

    /**
     * Controller that handling sign up information and events.
     * Send user sign up info on server {@link signUp} and get response.
     * Change authentication service parameters, such like isAuthenticate variable.
     * @controller
     */
    .controller('signUpCtrl', ['$scope', '$authentication', '$connection', '$animation',

        function ($scope, $authentication, $connection, $animation) {

            // -------------------------------
            // Private functions.

            /**
             * Validating.
             */
            function valid() {

                if (details.password != details.passwordCheck) {

                    alert.alertWarning("Passwords don't match.", false, true, false);

                    return false;

                }

                return true;

            }

            // -------------------------------

            /**
             * Initializing.
             * @see html/authentication/index.html
             * @see controllers/utils.js
             */
            initialize($scope, $authentication, $animation, $connection.redirect);

            var details = $scope.authenticationDetails;

            var alert = $scope.authenticationAlert;

            $scope.authenticate = function () {

                if (!valid()) return;

                $connection.httpSignUp(details)

                    .success(function (authStatus) {

                         /**
                          * If sign up success, then redirect to sign in page.
                          * Else display warning.
                          */

                         if (authStatus.success) {

                             $connection.redirect.toSignIn();

                         } else {

                             alert.alertWarning(authStatus.message, true, false, false);

                         }

                     });

            };

        }

    ]);