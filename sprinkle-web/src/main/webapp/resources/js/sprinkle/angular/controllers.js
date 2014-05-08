'use strict';

/* Controllers */

angular.module('sprinkle.authentication', [])
    .controller('signInCtrl', ['$scope', '$location', '$http', '$authentication',
        function ($scope, $location, $http, $authentication) {
            // Private functions
            function alertWarning () {
                $scope.signAlert.change('Invalid e-mail address or password.', true);
                $scope.signAlert.invalidEmail = true;
                $scope.signAlert.invalidPassword = true;
                jQuery("#sign-container").shake(3, 7, 400);
            }

            $scope.isSignIn = $authentication.isSignIn = true;
            // Authentication information
            $scope.sign = new Authentication();
            // Alert information
            $scope.signAlert = new AuthenticationAlert($scope.sign);

            $scope.signIn = function () {
                if (!isValidEmailAddress($scope) || $scope.sign.password == '') {
                    alertWarning();
                    return;
                }

                $http.post("j_spring_security_check",
                    {
                        j_username: $scope.sign.email,
                        j_password: $scope.sign.password
                    }).success(function () {
                        $authentication.signIn();
                        $location.path("/profile");
                    }).error(function () {
                        alertWarning();
                    });
            };

            checkboxStyle();
        }
    ])
    .controller('signUpCtrl', ['$scope', '$authentication', '$http', '$location',
        function ($scope, $authentication, $http, $location) {
            // Private functions
            function alertWarning (message, invalidEmail, invalidPassword) {
                $scope.signAlert.change(message, true);

                if (invalidPassword){
                    $scope.signAlert.invalidPassword = true;
                }
                else if (invalidEmail) {
                    $scope.signAlert.invalidEmail = true;
                } else {
                    $scope.signAlert.invalidFullName = true;
                }

                jQuery("#sign-container").shake(3, 7, 400);
            }

            $scope.isSignIn = $authentication.isSignIn = false;
            // Authentication information
            $scope.sign = new Authentication();
            // Alert information
            $scope.signAlert = new AuthenticationAlert($scope.sign);

            $scope.signUp = function () {
                if ($scope.sign.password != $scope.sign.passwordCheck) {
                    alertWarning("Passwords don't match.", false, true);
                    return;
                }
                if (!isValidEmailAddress($scope) || $scope.sign.fullName == '') {
                    alertWarning('Invalid e-mail address or full name.', true, false);
                    return;
                }
                $http.post("/authentication/signup",
                {
                    email: $scope.sign.email,
                    fullName: $scope.sign.fullName,
                    password: $scope.sign.password
                }).success(function () {
                    $authentication.signUp();
                    $location.path("/signin");
                }).error(function () {
                    alertWarning('This e-mail is already registered.', false, false);
                });
            };
        }
    ]);

function AuthenticationAlert (sign) {
    var show = false;
    var message = "";

    var invalidPassword = false;
    var invalidFullName = false;
    var invalidEmail = false;

    this.change = function (message, show) {
        this.show = show;
        this.message = message;
        sign.reset();
    };
}

function Authentication () {
    var email = '';
    var password = '';
    var passwordCheck = '';
    var fullName = '';

    this.reset = function () {
        this.email = '';
        this.password = '';
        this.passwordCheck = '';
        this.fullName = '';
    };
}