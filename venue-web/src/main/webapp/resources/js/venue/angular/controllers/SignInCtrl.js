'use strict';

/**
 * Created by vladthelittleone on 08.06.14.
 */
angular.module('venue.controllers')

    /**
     * Controller that handling sign in information and events.
     * Send user sign in info on server {@link authenticate} and get response.
     * @controller
     */
    .controller('signInCtrl', ['$scope', '$connection', '$authentication', '$animation',

        function ($scope, $connection, $authentication, $animation) {

            /**
             * Initializing.
             * @see html/authentication/index.html
             * @see controllers/utils.js
             */
            initialize($scope, $authentication, $animation, $connection.redirect);

            var details = $scope.authenticationDetails;

            var alert = $scope.authenticationAlert;

            $scope.authenticate = function () {

                $connection.httpSignIn(details)

                    .success(function (profileStatus) {

                         /**
                          * If user sing in, then redirect to profile page.
                          * Else display warning.
                          */
                         if (profileStatus.signedIn) {

                             $connection.redirect.toProfileWithId(profileStatus.id);

                         } else {

                             alert.alertMessage(profileStatus.message);

                         }

                    });

            };

            checkboxStyle();

        }

    ]);