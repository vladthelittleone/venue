/**
 * Created by vladthelittleone on 08.06.14.
 * Initialization of sprinkle.controllers.
 */
angular.module('sprinkle.controllers', [])
    /**
     * Controller that handling sign in information and events.
     * Send user sign in info on server {@link authenticate} and get response.
     * @controller
     */
    .controller('signInCtrl', ['$scope', '$url', '$authentication', '$http', '$animation',
        function ($scope, $url, $authentication, $http, $animation) {

            /**
             * Initializing.
             * @see html/authentication/index.html
             * @see controllers/utils.js
             */
            initialize($scope, $authentication, $url.redirect);

            var alert = $scope.authenticationAlert;
            var details = $scope.authenticationDetails;

            $scope.authenticate = function () {
                var payload =
                    'j_username=' + details.email +
                    '&j_password=' + details.password +
                    '&_spring_security_remember_me=' + details.rememberMe;

                var config = {
                    headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
                };

                $http.post($url.signIn, payload, config).
                    success(function (profileStatus) {
                        /**
                         * If user sing in, then redirect to profile page.
                         * Else display warning.
                         */
                        if (profileStatus.signedIn) {
                            $url.redirect.toProfileWithId(profileStatus.id);
                        } else {
                            alert.alertMessage(profileStatus.message);
                            $animation.authenticationShake();
                        }
                    });
            };

            checkboxStyle();
        }
    ])
    /**
     * Controller that handling sign up information and events.
     * Send user sign up info on server {@link signUp} and get response.
     * Change authentication service parameters, such like isAuthenticate variable.
     * @controller
     */
    .controller('signUpCtrl', ['$scope', '$authentication', '$http', '$url', '$animation',
        function ($scope, $authentication, $http, $url, $animation) {

            // -------------------------------
            // Private functions.

            /**
             * Validating.
             */
            function valid() {
                var details = $scope.authenticationDetails;
                var alert = $scope.authenticationAlert;

                if (details.password != details.passwordCheck) {
                    alert.alertWarning("Passwords don't match.", false, true, false);
                    $animation.authenticationShake();
                    return false;
                }

                return true;
            }

            // -------------------------------

            /**
             * Initializing. isSignInVisible field equals true, this means that sign up components will be shown.
             * @see html/authentication/index.html
             * @see controllers/utils.js
             */
            initialize($scope, $authentication, $url.redirect);
            var alert = $scope.authenticationAlert;
            var details = $scope.authenticationDetails;

            $scope.authenticate = function () {

                if (!valid()) return;

                $http.post($url.signUp,
                    {
                        username: details.email,
                        fullname: details.fullName,
                        password: details.password
                    }).success(function (authStatus) {
                        /**
                         * If sign up success, then redirect to sign in page.
                         * Else display warning.
                         */
                        if (authStatus.success) {
                            $url.redirect.toSignIn();
                        } else {
                            alert.alertWarning(authStatus.message, true, false, false);
                            $animation.authenticationShake();
                        }
                    });
            };
        }
    ]);

/**
 * Initializer of authentication controllers.
 * @param $scope - controller scope.
 * @param $authentication - authenticate service.
 * @param redirect - redirect service.
 */
function initialize($scope, $authentication, redirect) {
    /**
     * Check authentication of user.
     */
    if ($authentication.isAuthenticate()) {
        redirect.toProfile();
        return;
    }

    // Redirect mechanism
    $scope.redirect = redirect;

    // Authentication information
    $scope.authenticationDetails = new Authentication();
    // Alert information
    $scope.authenticationAlert = new AuthenticationAlert($scope.authenticationDetails);
}