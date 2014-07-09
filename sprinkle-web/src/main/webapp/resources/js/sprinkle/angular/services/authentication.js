/**
 * Created by vladthelittleone on 08.06.14.
 * Initialization of sprinkle.services.
 */
angular.module('sprinkle.services', [])
    /**
     * Service that contains information about authentication and authentication logic.
     */
    .factory('$authentication', [ '$storage',
        function ($storage) {
            return {
                // true - show sign in components, false - show sign up components.
                isSignIn: true,

                /**
                 * @returns {string}
                 */
                getUsername: function () {
                    return $storage.local.getItem('username');
                },

                /**
                 * @returns {string}
                 */
                getId: function () {
                    return $storage.local.getItem('id');
                },

                /**
                 * @returns {boolean}
                 */
                isAuthenticate: function () {
                    return $storage.local.getItem('isAuthenticate') === 'true';
                },

                authenticate: function (user) {
                    $storage.local.setItem('isAuthenticate', 'true');
                    $storage.local.setItem('username', user.username);
                    $storage.local.setItem('id', user.id);
                },

                logout: function () {
                    $storage.local.clear();
                },

                isValidEmailAddress: function (email) {
                    var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);

                    if (!pattern.test(email)) {
                        return false;
                    }

                    return email != '';
                }
        };
    }]);