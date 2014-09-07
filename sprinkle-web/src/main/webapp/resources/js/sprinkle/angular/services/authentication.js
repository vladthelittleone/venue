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
                }
        };
    }]);