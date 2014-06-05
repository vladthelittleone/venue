'use strict';

/* Controllers */

angular.module('sprinkle.authentication', [])

    /**
     * Controller that handling sign in information and events.
     * Send user sign in info on server {@link authenticate} and get response.
     * @controller
     */
    .controller('signInCtrl', ['$scope', '$redirect', '$http', '$authentication',
        function ($scope, $redirect, $http, $authentication) {
            // Private functions
            // =============================================================================
            function alertWarning(msg) {
                $scope.alert.change(msg, true);
                $scope.alert.invalidEmail = true;
                $scope.alert.invalidPassword = true;
                jQuery("#sign-container").shake(3, 7, 400);
            }

            // =============================================================================

            initialize(true, $scope, $authentication, $redirect);

            $scope.authenticate = function () {
                if (!$authentication.isValidEmailAddress($scope) || !$scope.sign.password) {
                    alertWarning('Invalid e-mail address or password.');
                    return;
                }

                var payload =
                    'j_username=' + $scope.sign.email +
                    '&j_password=' + $scope.sign.password +
                    '&_spring_security_remember_me=' + $scope.sign.rememberMe;

                var config = {
                    headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
                };

                $http.post("j_spring_security_check", payload, config).
                    success(function (profileStatus) {
                        if (profileStatus.signedIn) {
                            $redirect.toProfileWithId(profileStatus.id);
                        } else {
                            alertWarning(profileStatus.message);
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
    .controller('signUpCtrl', ['$scope', '$authentication', '$http', '$redirect',
        function ($scope, $authentication, $http, $redirect) {
            // Private functions
            // =============================================================================
            function alertWarning(message, invalidEmail, invalidPassword, invalidFullName) {
                $scope.alert.change(message, true);

                $scope.alert.invalidPassword = invalidPassword;
                $scope.alert.invalidEmail = invalidEmail;
                $scope.alert.invalidFullName = invalidFullName;

                jQuery("#sign-container").shake(3, 7, 400);
            }

            function valid() {
                if (!$authentication.isValidEmailAddress($scope) || !$scope.sign.fullName) {
                    alertWarning('Invalid e-mail address or full name.', true, false, true);
                    return false;
                }

                if ($scope.sign.password != $scope.sign.passwordCheck) {
                    alertWarning("Passwords don't match.", false, true, false);
                    return false;
                }

                if (!$scope.sign.password || !$scope.sign.passwordCheck) {
                    alertWarning('Invalid password.', false, true, false);
                    return false;
                }

                return true;
            }

            // =============================================================================

            initialize(false, $scope, $authentication, $redirect);

            $scope.authenticate = function () {

                if (!valid()) return;

                $http.post("/authentication/signup",
                    {
                        username: $scope.sign.email,
                        fullname: $scope.sign.fullName,
                        password: $scope.sign.password
                    }).success(function (authStatus) {
                        if (authStatus.success) {
                            $redirect.toSignIn();
                        } else {
                            alertWarning(authStatus.message, true, false, false);
                        }
                    });
            };
        }
    ])

    /**
     * Main controller that handle body content.
     */
    .controller('bodyCtrl', ['$scope', '$authentication', '$http', '$redirect',
        function ($scope, $authentication, $http, $redirect) {
            $scope.auth = $authentication;

            $scope.logout = function () {
                $http.get("/logout").
                    success(function () {
                        $scope.auth.logout();
                        $redirect.toSignIn();
                    });
            }
        }
    ]);

// Help objects

function AuthenticationAlert(sign) {
    this.show = false;
    this.message = "";

    this.invalidPassword = false;
    this.invalidFullName = false;
    this.invalidEmail = false;

    this.change = function (message, show) {
        this.show = show;
        this.message = message;
        this.invalidPassword = false;
        this.invalidFullName = false;
        this.invalidEmail = false;
        sign.reset();
    };
}

function Authentication() {
    this.rememberMe = false;
    this.email = '';
    this.password = '';
    this.passwordCheck = '';
    this.fullName = '';

    this.switchRememberMe = function () {
        this.rememberMe = !this.rememberMe;
    };

    this.reset = function () {
        this.email = '';
        this.password = '';
        this.passwordCheck = '';
        this.fullName = '';
    };
}

function initialize(isSignIn, $scope, $authentication, $redirect) {
    if ($authentication.isAuthenticate()) {
        $redirect.toProfile();
        return;
    }

    // Set global model
    $scope.isSignIn = $authentication.isSignIn = isSignIn;
    // Authentication information
    $scope.sign = new Authentication();
    // Alert information
    $scope.alert = new AuthenticationAlert($scope.sign);
}